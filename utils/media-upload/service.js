let path = require('path');
let fs = require('fs');
let util = require('util');
let uuid = require('uuid');
let async = require("async");
let gm;

let url = 'media_upload';

gm = require('gm');


module.exports = common.create_service(url);

let service = module.exports;

let GENERAL_DEFAULT_PROPORTION = 3;//最大比例
let GENERAL_ISLARGEPROPORTION = false;
let GENERAL_ORI_X = 1200;
let GENERAL_ORI_Y = 1200;

//let im = gm.subClass({ imageMagick : true });
//gm = gm.subClass({ imageMagick : true });

function process_photo(file, store, cb) {
    let result = {err: []};
    let calls = 9;
    let xy = 1200;
    let DEFAULT_PROPORTION = GENERAL_DEFAULT_PROPORTION;//最大比例
    let isLargeProportion = GENERAL_ISLARGEPROPORTION;
    let ori_x = GENERAL_ORI_X;
    let ori_y = GENERAL_ORI_Y;

    function getExt(sourceExt, defaultExt) {
        if (sourceExt != ".gif") {
            return defaultExt;
        } else {
            return "gif";
        }
    }

    function do_cb() {
        calls = calls - 1;
        //console.info('calls:'+ calls);
        if (calls === -1)
            console.info('calls:' + calls);

        if (calls === 0)
            cb(result);

    }

    function doit(buf) {

        //buf = fs.readFileSync(file.source);
//        console.log('buf ok ' +((new Date().getTime()) - tt ));

        let imageobj = gm(buf);

        if (config.photo_options.watermark && config.photo_options.watermark.file) {

            imageobj.size(function (err, size) {
                if (!err) {
                    xy = Math.max(size.width, size.height);
                    ori_x = size.width;
                    ori_y = size.height;
                    let proportion = 1;
                    if (xy === ori_x) {
                        proportion = xy / ori_y;
                    } else {
                        proportion = xy / ori_x
                    }
                    if (proportion < DEFAULT_PROPORTION) {
                        isLargeProportion = false;
                    } else {
                        isLargeProportion = true;
                    }
                    result.size = size;

                }
                imageobj.filter('sinc')
                    .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.high.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.high.pixel))
                    .toBuffer(config.photo_options.high_psd.format, function (err, high_psd_buf) {
                        if (extname != '.psd')
                            store.photo.write_file(file.high_psd, high_psd_buf, function (err) {
                                // console.log('high_psd ok ' +((new Date().getTime()) - tt ));
                                if (err) {
                                    result.err.push(err);
                                }
                                do_cb();
                            });

                    })
                    .toBuffer(getExt(extname, config.photo_options.high.format), function (err, high_buf) {
                        store.photo.write_file(file.high, high_buf, function (err) {
                            // console.log('high ok ' +((new Date().getTime()) - tt ));
                            if (err) {
                                result.err.push(err);
                            }
                            do_cb();
                        });

                        gm(high_buf).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.middle.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.middle.pixel))
                            .toBuffer(getExt(extname, config.photo_options.middle.format), function (err, middle_buf) {
                                if (err) {
                                    console.error(err);
                                    result.err.push(err);
                                    do_cb();
                                }
                                else {
                                    store.photo.write_file(file.middle, middle_buf, function (err) {
                                        if (err) {
                                            result.err.push(err);
                                        }
                                        do_cb();

                                    });
                                }

                            });

                    })

                    .composite(config.photo_options.watermark.file, '50')
                    .gravity(config.photo_options.watermark.position)
                    .dissolve(config.photo_options.watermark.opacity)

                    .filter('sinc')
                    .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.high_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.high_wm.pixel))
                    .toBuffer(getExt(extname, config.photo_options.high_wm.format), function (err, high_wm_buf) {
                        store.photo_pre.write_file(file.high_wm, high_wm_buf, function (err) {
                            // console.log('high_wm ok ' +((new Date().getTime()) - tt ));
                            if (err) {
                                result.err.push(err);
                            }
                            do_cb();
                        });
                        gm(high_wm_buf).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.middle_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.middle_wm.pixel))
                            .toBuffer(getExt(extname, config.photo_options.middle_wm.format), function (err, middle_wm_buf) {
                                store.photo_pre.write_file(file.middle_wm, middle_wm_buf, function (err) {
                                    // console.log('middle_wm ok ' +((new Date().getTime()) - tt ));
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();
                                });
                            }).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.low_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.low_wm.pixel))
                            .toBuffer(getExt(extname, config.photo_options.middle_wm.format), function (err, low_wm_buf) {
                                store.photo_pre.write_file(file.low_wm, low_wm_buf, function (err) {
                                    // console.log('low_wm ok ' +((new Date().getTime()) - tt ));
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();
                                });
                            }).filter('sinc')
                            .resize(isLargeProportion ? ori_x : config.photo_options.thumb_wm.pixel, isLargeProportion ? ori_y : config.photo_options.thumb_wm.pixel)
                            .toBuffer(getExt(extname, config.photo_options.thumb_wm.format), function (err, thumb_wm_buf) {
                                store.photo_pre.write_file(file.thumb_wm, thumb_wm_buf, function (err) {
                                    // console.log('thumb_wm ok ' + ((new Date().getTime()) - tt ));
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();


                                });
                            })

                    })
            })
        }
        else {
            imageobj.size(function (err, size) {
                if (!err) {
                    xy = Math.max(size.width, size.height);
                    result.size = size;
                    ori_x = size.width;
                    ori_y = size.height;
                    let proportion = 1;
                    if (xy === ori_x) {
                        proportion = xy / ori_y;
                    } else {
                        proportion = xy / ori_x
                    }
                    if (proportion < DEFAULT_PROPORTION)
                        isLargeProportion = false;
                    else
                        isLargeProportion = true;
                    result.size = size;
                }
                imageobj.filter('sinc')
                    .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.high.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.high.pixel))
                    .toBuffer(config.photo_options.high_psd.format, function (err, high_psd_buf) {
                        if (extname != '.psd')
                            store.photo.write_file(file.high_psd, high_psd_buf, function (err) {
                                // console.log('high_psd ok ' +((new Date().getTime()) - tt ));
                                if (err) {
                                    result.err.push(err);
                                }
                                do_cb();
                            });

                    })
                    .toBuffer(getExt(extname, config.photo_options.high.format), function (err, high_buf) {
                        store.photo.write_file(file.high, high_buf, function (err) {
                            // console.log('high ok ' +((new Date().getTime()) - tt ));
                            if (err) {
                                result.err.push(err);
                            }
                            do_cb();
                        });

                        gm(high_buf).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.middle.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.middle.pixel))
                            .toBuffer(getExt(extname, config.photo_options.middle.format), function (err, middle_buf) {
                                if (err) {
                                    console.error(err);
                                    result.err.push(err);
                                    do_cb();
                                }
                                else {
                                    store.photo.write_file(file.middle, middle_buf, function (err) {
                                        if (err) {
                                            result.err.push(err);
                                        }
                                        do_cb();

                                    });
                                }

                            });

                    })

                    .filter('sinc')
                    .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.high_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.high_wm.pixel))
                    .toBuffer(getExt(extname, config.photo_options.high_wm.format), function (err, high_wm_buf) {
                        store.photo_pre.write_file(file.high_wm, high_wm_buf, function (err) {
                            // console.log('high_wm ok ' +((new Date().getTime()) - tt ));
                            if (err) {
                                result.err.push(err);
                            }
                            do_cb();
                        });
                        gm(high_wm_buf).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.middle_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.middle_wm.pixel))
                            .toBuffer(getExt(extname, config.photo_options.middle_wm.format), function (err, middle_wm_buf) {
                                store.photo_pre.write_file(file.middle_wm, middle_wm_buf, function (err) {
                                    // console.log('middle_wm ok ' +((new Date().getTime()) - tt ));
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();
                                });
                            }).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.low_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.low_wm.pixel))
                            .toBuffer(getExt(extname, config.photo_options.middle_wm.format), function (err, low_wm_buf) {
                                store.photo_pre.write_file(file.low_wm, low_wm_buf, function (err) {
                                    // console.log('low_wm ok ' +((new Date().getTime()) - tt ));
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();
                                });
                            }).filter('sinc')
                            .resize(isLargeProportion ? ori_x : config.photo_options.thumb_wm.pixel, isLargeProportion ? ori_y : config.photo_options.thumb_wm.pixel)
                            .toBuffer(getExt(extname, config.photo_options.thumb_wm.format), function (err, thumb_wm_buf) {
                                store.photo_pre.write_file(file.thumb_wm, thumb_wm_buf, function (err) {
                                    // console.log('thumb_wm ok ' + ((new Date().getTime()) - tt ));
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();


                                });
                            })

                    })
                ;
            })
        }


    }

    function dogif(buf) {
        let imageobj = gm(buf);

        imageobj.size({bufferStream: true}, function (err, size) {
            if (!err) {
                xy = Math.max(size.width, size.height);
                result.size = size;
            } else {
                result.err.push(err);
            }
            do_cb();
        });

        store.photo.write_file(file.high, buf, function (err) {
            console.log('high ok ' + ((new Date().getTime()) - tt ));
            if (err) {
                result.err.push(err);
            }
            do_cb();
        });
        store.photo.write_file(file.middle, buf, function (err) {
            if (err) {
                result.err.push(err);
            }
            do_cb();
        });
        store.photo_pre.write_file(file.high_wm, buf, function (err) {
            console.log('high_wm ok ' + ((new Date().getTime()) - tt ));
            if (err) {
                result.err.push(err);
            }
            do_cb();
        });
        store.photo_pre.write_file(file.middle_wm, buf, function (err) {
            console.log('middle_wm ok ' + ((new Date().getTime()) - tt ));
            if (err) {
                result.err.push(err);
            }
            do_cb();
        });
        store.photo_pre.write_file(file.low_wm, buf, function (err) {
            console.log('low_wm ok ' + ((new Date().getTime()) - tt ));
            if (err) {
                result.err.push(err);
            }
            do_cb();
        });
        store.photo_pre.write_file(file.thumb_wm, buf, function (err) {
            console.log('thumb_wm ok ' + ((new Date().getTime()) - tt ));
            if (err) {
                result.err.push(err);
            }
            do_cb();
        });

    }

    let tt = new Date().getTime();

    let extname = path.extname(file.source).toLowerCase();

//        gm(pre_buf,file.source)
//            .flatten()


    fs.readFile(file.source, function (err, buf) {

        if (buf) {
            let imageobj = gm(buf);

            imageobj.identify(function (err, data) {
//                                    let temp_a = data.Geometry.split('x');
//                                    result.size = {
//                                        width:temp_a[0],
//                                        hieght:temp_a[1]
//                                    };

                if (err) {
                    result.err.push(err);
                }
                else
                    result.info = data;

                do_cb();

            });

            if (file.raw) {
                store.photo.write_file(file.raw, buf, function (err) {
                    if (err) {
                        result.err.push(err);
                    }

                    do_cb();

                });
            }
            else {
                do_cb();

            }

            if (extname == ".gif") {
                dogif(buf);
            } else if (extname === '.psd') {//} || extname === '.tif' ||  extname === '.tiff' ||  extname === '.png') {
                store.photo.write_file(file.high_psd, buf, function (err) {
                    if (err) {
                        result.err.push(err);
                    }
                    do_cb();
                });

                gm(buf, file.source)
                    .flatten()
                    .toBuffer('BMP', function (err, new_buf) {
                        if (err) {
                            result.err.push(err);
                            cb({code: 'error', msg: 'read file error!'});

                        }
                        doit(new_buf);

                    });

            }
            else {
                gm(buf)
                    .autoOrient()
                    .flatten()
                    .toBuffer('bmp', function (err, new_buf) {
                        if (err) {
                            result.err.push(err);
                            cb({code: 'error', msg: 'read file error!'});

                        }
                        else {
                            doit(new_buf);
                        }
                    });

            }

        }
        else {
            cb({error: {code: 'error', msg: 'read file error! filepath: ' + file.source}});
        }


    });

}

function process_wire_photo(file, store, cb) {
    let result = {err: []};
    let calls = 9;
    let xy = 1200;
    let DEFAULT_PROPORTION = GENERAL_DEFAULT_PROPORTION;//最大比例
    let isLargeProportion = GENERAL_ISLARGEPROPORTION;
    let ori_x = GENERAL_ORI_X;
    let ori_y = GENERAL_ORI_Y;

    function getExt(sourceExt, defaultExt) {
        if (sourceExt != ".gif") {
            return defaultExt;
        } else {
            return "gif";
        }
    }

    function do_cb() {
        calls = calls - 1;
        // console.info('calls:'+ calls);
        if (calls === -1)
            console.info('calls:' + calls);

        if (calls === 0)
            cb(result);

    }

    function doit(buf) {
        let imageobj = gm(buf);
        if (config.photo_options.watermark && config.photo_options.watermark.file) {

            imageobj.size(function (err, size) {
                if (!err) {
                    xy = Math.max(size.width, size.height);
                    result.size = size;
                    ori_x = size.width;
                    ori_y = size.height;
                    let proportion = 1;
                    if (xy === ori_x) {
                        proportion = xy / ori_y;
                    } else {
                        proportion = xy / ori_x
                    }
                    if (proportion < DEFAULT_PROPORTION)
                        isLargeProportion = false;
                    else
                        isLargeProportion = true;
                }
                imageobj.filter('sinc')
                    .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.high.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.high.pixel))
                    .toBuffer(config.photo_options.high_psd.format, function (err, high_psd_buf) {
                        if (extname != '.psd')
                            store.photo.write_file(file.high_psd, high_psd_buf, function (err) {
                                // console.log('high_psd ok ' + ((new Date().getTime()) - tt ));
                                if (err) {
                                    result.err.push(err);
                                }
                                do_cb();
                            });

                    })
                    .toBuffer(getExt(extname, config.photo_options.high.format), function (err, high_buf) {
                        store.photo.write_file(file.high, high_buf, function (err) {
                            if (err) {
                                result.err.push(err);
                            }
                            do_cb();

                        });

                        gm(high_buf).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.middle.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.middle.pixel))
                            .toBuffer(getExt(extname, config.photo_options.middle.format), function (err, middle_buf) {
                                if (err) {
                                    console.error(err);
                                    result.err.push(err);
                                    do_cb();
                                }
                                else {
                                    store.photo.write_file(file.middle, middle_buf, function (err) {
                                        if (err) {
                                            result.err.push(err);
                                        }
                                        do_cb();

                                    });
                                }

                            });

                    })

                    .composite(config.photo_options.watermark.file, '50')
                    .gravity(config.photo_options.watermark.position)
                    .dissolve(config.photo_options.watermark.opacity)
                    .filter('sinc')
                    .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.high_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.high_wm.pixel))
                    .toBuffer(getExt(extname, config.photo_options.high_wm.format), function (err, high_wm_buf) {
                        store.photo_pre.write_file(file.high_wm, high_wm_buf, function (err) {
                            // console.log('high_wm ok ' + ((new Date().getTime()) - tt ));
                            if (err) {
                                result.err.push(err);
                            }
                            do_cb();
                        });
                        gm(high_wm_buf).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.middle_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.middle_wm.pixel))
                            .toBuffer(getExt(extname, config.photo_options.middle_wm.format), function (err, middle_wm_buf) {
                                store.photo_pre.write_file(file.middle_wm, middle_wm_buf, function (err) {
                                    // console.log('middle_wm ok ' + ((new Date().getTime()) - tt ));
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();
                                });
                            }).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.low_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.low_wm.pixel))
                            .toBuffer(getExt(extname, config.photo_options.low_wm.format), function (err, low_wm_buf) {
                                store.photo_pre.write_file(file.low_wm, low_wm_buf, function (err) {
                                    // console.log('low_wm ok ' + ((new Date().getTime()) - tt ));
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();
                                });
                            }).filter('sinc')
                            .resize(isLargeProportion ? ori_x : config.photo_options.thumb_wm.pixel, isLargeProportion ? ori_y : config.photo_options.thumb_wm.pixel)
                            .toBuffer(getExt(extname, config.photo_options.thumb_wm.format), function (err, thumb_wm_buf) {
                                store.photo_pre.write_file(file.thumb_wm, thumb_wm_buf, function (err) {
                                    // console.log('thumb_wm ok ' + ((new Date().getTime()) - tt ));
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();

//                            gm(thumb_wm_buf)
//                                .identify(function(err,data){
//
//                                    if(err){
//                                        result.err.push(err);
//                                    }
//                                    else
//                                        result.info = data;
//
//                                    do_cb();
//
//                                });


                                });
                            })

                    })
                ;
            })
        }
        else {
            imageobj.size(function (err, size) {
                if (!err) {
                    xy = Math.max(size.width, size.height);
                    result.size = size;
                    ori_x = size.width;
                    ori_y = size.height;
                    let proportion = 1;
                    if (xy === ori_x) {
                        proportion = xy / ori_y;
                    } else {
                        proportion = xy / ori_x
                    }
                    if (proportion < DEFAULT_PROPORTION)
                        isLargeProportion = false;
                    else
                        isLargeProportion = true;
                    result.size = size;
                }
                imageobj.filter('sinc')
                    .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.high.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.high.pixel))
                    .toBuffer(config.photo_options.high_psd.format, function (err, high_psd_buf) {
                        if (extname != '.psd')
                            store.photo.write_file(file.high_psd, high_psd_buf, function (err) {
                                // console.log('high_psd ok ' + ((new Date().getTime()) - tt ));
                                if (err) {
                                    result.err.push(err);
                                }
                                do_cb();
                            });

                    })
                    .toBuffer(getExt(extname, config.photo_options.high.format), function (err, high_buf) {
                        store.photo.write_file(file.high, high_buf, function (err) {
                            if (err) {
                                result.err.push(err);
                            }
                            do_cb();

                        });

                        gm(high_buf).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.middle.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.middle.pixel))
                            .toBuffer(getExt(extname, config.photo_options.middle.format), function (err, middle_buf) {
                                if (err) {
                                    console.error(err);
                                    result.err.push(err);
                                    do_cb();
                                }
                                else {
                                    store.photo.write_file(file.middle, middle_buf, function (err) {
                                        if (err) {
                                            result.err.push(err);
                                        }
                                        do_cb();

                                    });
                                }

                            });

                    })

                    .filter('sinc')
                    .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.high_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.high_wm.pixel))
                    .toBuffer(getExt(extname, config.photo_options.high_wm.format), function (err, high_wm_buf) {
                        store.photo_pre.write_file(file.high_wm, high_wm_buf, function (err) {
                            // console.log('high_wm ok ' + ((new Date().getTime()) - tt ));
                            if (err) {
                                result.err.push(err);
                            }
                            do_cb();
                        });
                        gm(high_wm_buf).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.middle_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.middle_wm.pixel))
                            .toBuffer(getExt(extname, config.photo_options.middle_wm.format), function (err, middle_wm_buf) {
                                store.photo_pre.write_file(file.middle_wm, middle_wm_buf, function (err) {
                                    // console.log('middle_wm ok ' + ((new Date().getTime()) - tt ));
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();
                                });
                            }).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.low_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.low_wm.pixel))
                            .toBuffer(getExt(extname, config.photo_options.middle_wm.format), function (err, low_wm_buf) {
                                store.photo_pre.write_file(file.low_wm, low_wm_buf, function (err) {
                                    // console.log('low_wm ok ' + ((new Date().getTime()) - tt ));
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();
                                });
                            }).filter('sinc')
                            .resize(isLargeProportion ? ori_x : config.photo_options.thumb_wm.pixel, isLargeProportion ? ori_y : config.photo_options.thumb_wm.pixel)
                            .toBuffer(getExt(extname, config.photo_options.thumb_wm.format), function (err, thumb_wm_buf) {
                                store.photo_pre.write_file(file.thumb_wm, thumb_wm_buf, function (err) {
                                    // console.log('thumb_wm ok ' + ((new Date().getTime()) - tt ));
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();

//                            gm(thumb_wm_buf)
//                                .identify(function(err,data){
//
//                                    if(err){
//                                        result.err.push(err);
//                                    }
//                                    else
//                                        result.info = data;
//
//                                    do_cb();
//
//                                });


                                });
                            })

                    })
                ;
            })
        }

    }

    let tt = new Date().getTime();

    let extname = path.extname(file.source).toLowerCase();

//        gm(pre_buf,file.source)
//            .flatten()

    fs.readFile(file.source, function (err, buf) {
        if (!err) {
            if (buf) {
                gm(buf).identify(function (err, data) {

                    if (err) {
                        result.err.push(err);
                    }
                    else
                        result.info = data;

                    do_cb();

                });
            }
            else
                do_cb();

            if (file.raw) {
                store.photo.write_file(file.raw, buf, function (err) {
                    if (err) {
                        result.err.push(err);
                    }

                    do_cb();

                });
            }
            else {
                do_cb();

            }


            doit(buf);

        }
        else {
            cb({error: {code: 'error', msg: 'read file error! filepath: ' + file.source}});
        }

    });


}

function process_online_photo(file, store, cb) {
    let result = {err: []};
    let calls = 7;
    let xy = 1200;
    let DEFAULT_PROPORTION = GENERAL_DEFAULT_PROPORTION;//最大比例
    let isLargeProportion = GENERAL_ISLARGEPROPORTION;
    let ori_x = GENERAL_ORI_X;
    let ori_y = GENERAL_ORI_Y;

    function do_cb() {
        calls = calls - 1;
        // console.info('calls:'+ calls);
        if (calls === -1)
            console.info('calls:' + calls);

        if (calls === 0)
            cb(result);

    }

    function doit(buf) {

        let imageobj = gm(buf);

        if (config.photo_options.watermark && config.photo_options.watermark.file) {

            imageobj.size(function (err, size) {
                if (!err) {
                    xy = Math.max(size.width, size.height);
                    result.size = size;
                    ori_x = size.width;
                    ori_y = size.height;
                    let proportion = 1;
                    if (xy === ori_x) {
                        proportion = xy / ori_y;
                    } else {
                        proportion = xy / ori_x
                    }
                    if (proportion < DEFAULT_PROPORTION)
                        isLargeProportion = false;
                    else
                        isLargeProportion = true;
                }
                imageobj.filter('sinc')
                    .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.high_psd.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.high_psd.pixel))
                    .toBuffer(config.photo_options.high_psd.format, function (err, high_psd_buf) {
                        store.photo.write_file(file.high_psd, high_psd_buf, function (err) {
                            if (err) {
                                result.err.push(err);
                            }
                            do_cb();
                        });

                    })
                    .toBuffer(config.photo_options.middle.format, function (err, high_buf) {

                        gm(high_buf).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.middle.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.middle.pixel))
                            .toBuffer(config.photo_options.middle.format, function (err, middle_buf) {
                                if (err) {
                                    console.error(err);
                                    result.err.push(err);
                                    do_cb();
                                }
                                else {
                                    store.photo.write_file(file.middle, middle_buf, function (err) {
                                        if (err) {
                                            result.err.push(err);
                                        }
                                        do_cb();

                                    });
                                }

                            });

                    })

                    .composite(config.photo_options.watermark.file, '50')
                    .gravity(config.photo_options.watermark.position)
                    .dissolve(config.photo_options.watermark.opacity)
                    .filter('sinc')
                    .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.high_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.high_wm.pixel))
                    .toBuffer(config.photo_options.high_wm.format, function (err, high_wm_buf) {
                        store.photo_pre.write_file(file.high_wm, high_wm_buf, function (err) {
                            if (err) {
                                result.err.push(err);
                            }
                            do_cb();
                        });
                        gm(high_wm_buf).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.middle_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.middle_wm.pixel))
                            .toBuffer(config.photo_options.middle_wm.format, function (err, middle_wm_buf) {
                                store.photo_pre.write_file(file.middle_wm, middle_wm_buf, function (err) {
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();
                                });
                            }).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.low_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.low_wm.pixel))
                            .toBuffer(config.photo_options.middle_wm.format, function (err, low_wm_buf) {
                                store.photo_pre.write_file(file.low_wm, low_wm_buf, function (err) {
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();
                                });
                            }).filter('sinc')
                            .resize(isLargeProportion ? ori_x : config.photo_options.thumb_wm.pixel, isLargeProportion ? ori_y : config.photo_options.thumb_wm.pixel)
                            .toBuffer(config.photo_options.thumb_wm.format, function (err, thumb_wm_buf) {
                                store.photo_pre.write_file(file.thumb_wm, thumb_wm_buf, function (err) {
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();


                                });
                            })

                    })
                ;
            })
        }
        else {

            imageobj.size(function (err, size) {
                if (!err) {
                    xy = Math.max(size.width, size.height);
                    result.size = size;
                    ori_x = size.width;
                    ori_y = size.height;
                    let proportion = 1;
                    if (xy === ori_x) {
                        proportion = xy / ori_y;
                    } else {
                        proportion = xy / ori_x
                    }
                    if (proportion < DEFAULT_PROPORTION)
                        isLargeProportion = false;
                    else
                        isLargeProportion = true;
                    result.size = size;
                }
                imageobj.filter('sinc')
                    .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.high_psd.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.high_psd.pixel))
                    .toBuffer(config.photo_options.high_psd.format, function (err, high_psd_buf) {
                        store.photo.write_file(file.high_psd, high_psd_buf, function (err) {
                            if (err) {
                                result.err.push(err);
                            }
                            do_cb();
                        });

                    })
                    .toBuffer(config.photo_options.middle.format, function (err, high_buf) {

                        gm(high_buf).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.middle.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.middle.pixel))
                            .toBuffer(config.photo_options.middle.format, function (err, middle_buf) {
                                if (err) {
                                    console.error(err);
                                    result.err.push(err);
                                    do_cb();
                                }
                                else {
                                    store.photo.write_file(file.middle, middle_buf, function (err) {
                                        if (err) {
                                            result.err.push(err);
                                        }
                                        do_cb();

                                    });
                                }

                            });

                    })
                    .filter('sinc')
                    .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.high_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.high_wm.pixel))
                    .toBuffer(config.photo_options.high_wm.format, function (err, high_wm_buf) {
                        store.photo_pre.write_file(file.high_wm, high_wm_buf, function (err) {
                            if (err) {
                                result.err.push(err);
                            }
                            do_cb();
                        });
                        gm(high_wm_buf).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.middle_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.middle_wm.pixel))
                            .toBuffer(config.photo_options.middle_wm.format, function (err, middle_wm_buf) {
                                store.photo_pre.write_file(file.middle_wm, middle_wm_buf, function (err) {
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();
                                });
                            }).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.low_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.low_wm.pixel))
                            .toBuffer(config.photo_options.middle_wm.format, function (err, low_wm_buf) {
                                store.photo_pre.write_file(file.low_wm, low_wm_buf, function (err) {
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();
                                });
                            }).filter('sinc')
                            .resize(isLargeProportion ? ori_x : config.photo_options.thumb_wm.pixel, isLargeProportion ? ori_y : config.photo_options.thumb_wm.pixel)
                            .toBuffer(config.photo_options.thumb_wm.format, function (err, thumb_wm_buf) {
                                store.photo_pre.write_file(file.thumb_wm, thumb_wm_buf, function (err) {
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();


                                });
                            })

                    })
                ;
            })
        }


    }

    file.raw = undefined;

//        gm(pre_buf,file.source)
//            .flatten()

    fs.readFile(file.source, function (err, buf) {
        if (!err) {
            store.photo.write_file(file.high, buf, function (err) {
                if (err) {
                    result.err.push(err);
                }
                do_cb();
            });

            doit(buf);
        }
        else {
            cb({error: {code: 'error', msg: 'read file error! filepath: ' + file.source}});
        }

    });


}

function process_photoshop_photo(file, store, cb) {
    let result = {err: []};
    let calls = 7;
    let xy = 1200;
    let DEFAULT_PROPORTION = GENERAL_DEFAULT_PROPORTION;//最大比例
    let isLargeProportion = GENERAL_ISLARGEPROPORTION;
    let ori_x = GENERAL_ORI_X;
    let ori_y = GENERAL_ORI_Y;

    function do_cb() {
        calls = calls - 1;
        // console.info('calls:'+ calls);
        if (calls === -1)
            console.info('calls:' + calls);

        if (calls === 0)
            cb(result);

    }

    function doit(buf) {
        let imageobj = gm(buf);

        if (config.photo_options.watermark && config.photo_options.watermark.file) {
            imageobj.size(function (err, size) {
                if (!err) {
                    xy = Math.max(size.width, size.height);
                    result.size = size;
                    ori_x = size.width;
                    ori_y = size.height;
                    let proportion = 1;
                    if (xy === ori_x) {
                        proportion = xy / ori_y;
                    } else {
                        proportion = xy / ori_x
                    }
                    if (proportion < DEFAULT_PROPORTION)
                        isLargeProportion = false;
                    else
                        isLargeProportion = true;
                }
                imageobj.filter('sinc')
                    .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.high.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.high.pixel))
                    .toBuffer(config.photo_options.high.format, function (err, high_psd_buf) {
                        store.photo.write_file(file.high, high_psd_buf, function (err) {
                            if (err) {
                                result.err.push(err);
                            }
                            do_cb();
                        });

                    })
                    .toBuffer(config.photo_options.middle.format, function (err, high_buf) {

                        gm(high_buf).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.middle.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.middle.pixel))
                            .toBuffer(config.photo_options.middle.format, function (err, middle_buf) {
                                if (err) {
                                    console.error(err);
                                    result.err.push(err);
                                    do_cb();
                                }
                                else {
                                    store.photo.write_file(file.middle, middle_buf, function (err) {
                                        if (err) {
                                            result.err.push(err);
                                        }
                                        do_cb();

                                    });
                                }

                            });

                    })

                    .composite(config.photo_options.watermark.file, '50')
                    .gravity(config.photo_options.watermark.position)
                    .dissolve(config.photo_options.watermark.opacity)
                    .filter('sinc')
                    .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.high_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.high_wm.pixel))
                    .toBuffer(config.photo_options.high_wm.format, function (err, high_wm_buf) {
                        store.photo_pre.write_file(file.high_wm, high_wm_buf, function (err) {
                            if (err) {
                                result.err.push(err);
                            }
                            do_cb();
                        });
                        gm(high_wm_buf).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.middle_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.middle_wm.pixel))
                            .toBuffer(config.photo_options.middle_wm.format, function (err, middle_wm_buf) {
                                store.photo_pre.write_file(file.middle_wm, middle_wm_buf, function (err) {
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();
                                });
                            }).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.low_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.low_wm.pixel))
                            .toBuffer(config.photo_options.middle_wm.format, function (err, low_wm_buf) {
                                store.photo_pre.write_file(file.low_wm, low_wm_buf, function (err) {
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();
                                });
                            }).filter('sinc')
                            .resize(isLargeProportion ? ori_x : config.photo_options.thumb_wm.pixel, isLargeProportion ? ori_y : config.photo_options.thumb_wm.pixel)
                            .toBuffer(config.photo_options.thumb_wm.format, function (err, thumb_wm_buf) {
                                store.photo_pre.write_file(file.thumb_wm, thumb_wm_buf, function (err) {
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();

                                });
                            })

                    })
                ;
            })
        }
        else {
            imageobj.size(function (err, size) {
                if (!err) {
                    xy = Math.max(size.width, size.height);
                    result.size = size;
                    ori_x = size.width;
                    ori_y = size.height;
                    let proportion = 1;
                    if (xy === ori_x) {
                        proportion = xy / ori_y;
                    } else {
                        proportion = xy / ori_x
                    }
                    if (proportion < DEFAULT_PROPORTION)
                        isLargeProportion = false;
                    else
                        isLargeProportion = true;
                    result.size = size;
                }
                imageobj.filter('sinc')
                    .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.high.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.high.pixel))
                    .toBuffer(config.photo_options.high.format, function (err, high_psd_buf) {
                        store.photo.write_file(file.high, high_psd_buf, function (err) {
                            if (err) {
                                result.err.push(err);
                            }
                            do_cb();
                        });

                    })
                    .toBuffer(config.photo_options.middle.format, function (err, high_buf) {

                        gm(high_buf).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.middle.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.middle.pixel))
                            .toBuffer(config.photo_options.middle.format, function (err, middle_buf) {
                                if (err) {
                                    console.error(err);
                                    result.err.push(err);
                                    do_cb();
                                }
                                else {
                                    store.photo.write_file(file.middle, middle_buf, function (err) {
                                        if (err) {
                                            result.err.push(err);
                                        }
                                        do_cb();

                                    });
                                }

                            });

                    })
                    .filter('sinc')
                    .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.high_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.high_wm.pixel))
                    .toBuffer(config.photo_options.high_wm.format, function (err, high_wm_buf) {
                        store.photo_pre.write_file(file.high_wm, high_wm_buf, function (err) {
                            if (err) {
                                result.err.push(err);
                            }
                            do_cb();
                        });
                        gm(high_wm_buf).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.middle_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.middle_wm.pixel))
                            .toBuffer(config.photo_options.middle_wm.format, function (err, middle_wm_buf) {
                                store.photo_pre.write_file(file.middle_wm, middle_wm_buf, function (err) {
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();
                                });
                            }).filter('sinc')
                            .resize(isLargeProportion ? ori_x : Math.min(xy, config.photo_options.low_wm.pixel), isLargeProportion ? ori_y : Math.min(xy, config.photo_options.low_wm.pixel))
                            .toBuffer(config.photo_options.middle_wm.format, function (err, low_wm_buf) {
                                store.photo_pre.write_file(file.low_wm, low_wm_buf, function (err) {
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();
                                });
                            }).filter('sinc')
                            .resize(isLargeProportion ? ori_x : config.photo_options.thumb_wm.pixel, isLargeProportion ? ori_y : config.photo_options.thumb_wm.pixel)
                            .toBuffer(config.photo_options.thumb_wm.format, function (err, thumb_wm_buf) {
                                store.photo_pre.write_file(file.thumb_wm, thumb_wm_buf, function (err) {
                                    if (err) {
                                        result.err.push(err);
                                    }
                                    do_cb();

                                });
                            })

                    })
                ;
            })
        }

    }

    file.raw = undefined;


    fs.readFile(file.source, function (err, buf) {
        if (!err) {
            store.photo.write_file(file.high_psd, buf, function (err) {
                if (err) {
                    result.err.push(err);
                }
                do_cb();
            });
            gm(buf, file.source)
                .flatten()
                .toBuffer('BMP', function (err, new_buf) {
                    if (err) {
                        result.err.push(err);
                        cb({code: 'error', msg: 'read file error!'});
                        return;

                    }
                    doit(new_buf);

                });

        }
        else {
            cb({error: {code: 'error', msg: 'read file error! filepath: ' + file.source}});
        }

    });


}


function is_image(ext) {
    let EXT = ext.replace('.', '').toUpperCase();
    let image_file_ext = [
        "3FR"
        , "8BIM"
        , "8BIMTEXT"
        , "8BIMWTEXT"
        , "APP1"
        , "APP1JPEG"
        , "ART"
        , "ARW"
        , "AVS"
        , "BIE"
        , "BMP"
        , "BMP2"
        , "BMP3"
        , "CALS"
        , "CAPTION"
        , "CIN"
        , "CMYK"
        , "CMYKA"
        , "CR2"
        , "CRW"
        , "CUR"
        , "CUT"
        , "DCM"
        , "DCR"
        , "DCX"
        , "DNG"
        , "DPS"
        , "DPX"
        , "EPDF"
        , "EPI"
        , "EPS"
        , "EPSF"
        , "EPSI"
        , "EPT"
        , "EPT2"
        , "EPT3"
        , "EXIF"
        , "FAX"
        , "FITS"
        , "FRACTAL"
        , "FPX"
        , "GIF"
        , "GIF87"
        , "GRADIENT"
        , "GRAY"
        , "HRZ"
        , "ICB"
        , "ICC"
        , "ICM"
        , "ICO"
        , "ICON"
        , "IDENTITY"
        , "IMAGE"
        , "IPTC"
        , "IPTCTEXT"
        , "IPTCWTEXT"
        , "JBG"
        , "JBIG"
        , "JNG"
        , "JP2"
        , "JPC"
        , "JPEG"
        , "JPG"
        , "K25"
        , "KDC"
        , "LABEL"
        , "M2V"
        , "MAP"
        , "MAT"
        , "MIFF"
        , "MNG"
        , "MONO"
        , "MPC"
        , "MPEG"
        , "MPG"
        , "MRW"
        , "MSL"
        , "MTV"
        , "MVG"
        , "NEF"
        , "NULL"
        , "OTB"
        , "P7"
        , "PAL"
        , "PALM"
        , "PBM"
        , "PCD"
        , "PCDS"
        , "PCT"
        , "PCX"
        , "PDB"
//        ,"PDF"
        , "PEF"
        , "PFA"
        , "PFB"
        , "PGM"
        , "PGX"
        , "PICON"
        , "PICT"
        , "PIX"
        , "PLASMA"
        , "PNG"
        , "PNG24"
        , "PNG32"
        , "PNG8"
        , "PNM"
        , "PPM"
//        ,"PS"
        , "PSD"
        , "PTIF"
        , "PWP"
        , "RAF"
        , "RAS"
        , "RGB"
        , "RGBA"
        , "RLA"
        , "RLE"
        , "SCT"
        , "SFW"
        , "SGI"
        , "STEGANO"
        , "SUN"
        , "SVG"
        , "TEXT"
        , "TGA"
        , "TIFF"
        , "TILE"
        , "TIM"
        , "TOPOL"
        , "TTF"
        //,"TXT"
        , "UYVY"
        , "VDA"
        , "VICAR"
        , "VID"
        , "VIFF"
        , "VST"
        , "WBMP"
        , "WMF"
        , "WPG"
        , "X"
        , "X3F"
        , "XBM"
        , "XC"
        , "XCF"
        , "XMP"
        , "XPM"
        , "XV"
        , "XWD"
        , "YUV"
    ];
    for (let i = 0; i < image_file_ext.length; i++) {
        if (image_file_ext[i] === EXT)
            return true;
    }

    return false;
}

function geo_conver(dfm) {
    //by zlz
    // if(dfm){
    //     console.info("gen_conver :", dfm);
    //     dfm = dfm.replace('/1','');
    //     dfm = dfm.replace('/1','');
    //     dfm = dfm.replace('/10000','');
    //     let a = dfm.split(',');
    //     let gps = a[0] * 1 + a[1] / 60 + a[2] / 36000000;
    //     console.info("gen_conver end: ", gps);
    //     return gps;
    // }
    // else
    //     return undefined;
    if (dfm) {
        //console.info("gen_conver :", dfm);
        let arr = dfm.split(',');
        let du, fen, miao;
        for (let i = 0; i < arr.length; i++) {
            let sp = arr[i].indexOf("/");
            let ls = arr[i].substring(0, sp);
            let rs = arr[i].substring(sp + 1, arr[i].length);
            if (i == 0) {
                du = parseInt(ls) / parseInt(rs);
            } else if (i == 1) {
                fen = parseInt(ls) / parseInt(rs) / 60;
            } else if (i == 2) {
                miao = parseInt(ls) / parseInt(rs) / 3600;
            }
        }
        let gps = du + fen + miao;
        //console.info("gen_conver end: ", gps);
        return gps;
    }
    else
        return undefined;
}

module.exports.process_file = function (udata, session, cb) {
    let lib_id = udata.lib_id;
    let file = udata.file;
    let is_update = udata.is_update;
    let content_id = udata.content_id;
    let photo_parent_id = udata.photo_parent_id;
    let content = {};
    let userInfo = {};
    let contentOther = {};

    function after_process_photo(data) {
        if (!data) {
            console.error('no photo data');
            return cb({code: 'error', msg: 'no photo data.'});
        }

        if (data && data.error) {
            console.error(data.error);
            return cb(data.error);
        }
        // console.info(data);

        let photo = {};
        let photo_exif = {};

        if (photo_parent_id)
            photo.parentId = photo_parent_id;
        photo.title = path.basename(file.name);
        photo.name = photo.title;
        photo.description = photo.title;
        photo.originalFileName = photo.title;
        photo.creatorId = content.creatorId;
        photo.authorId = content.creatorId;
        if (udata.wire) {
            photo.authorName = udata.wire.creator;
        }
        else {
            photo.authorName = userInfo.name;

        }
        content.authorName = photo.authorName;
        photo.photoEditorId = content.creatorId;
        photo.photoEditorName = userInfo.name;
        photo.width = data.size ? data.size.width : 0;
        photo.height = data.size ? data.size.height : 0;
        if (data.info) {
            photo.colorDepth = data.info.depth;
            photo.orientation = data.info.Orientation === 'TopLeft' ? 1 : 0;
            if (data.info['Channel Depths'].Red != undefined)
                photo.colorSp = "RGB";
            else if (data.info['Channel Depths'].Cyan != undefined)
                photo.colorSp = "CMYK";
            else if (data.info['Channel Depths'].Gray != undefined)
                photo.colorSp = "GRAY";

//            photo.width = data.info.size.width;
//            photo.height = data.info.size.height;
            //photo.fileSize = data.info.Filesize;
//            content.photo.fileSize = ;
//            content.photo.city = ;
//            content.photo.country = ;
//            content.photo.province = ;

            content.relateWord = photo.title;

            if (data.info['Profile-EXIF'] instanceof Object) {
                photo_exif.maker = data.info['Profile-EXIF']['Make'];
                photo_exif.model = data.info['Profile-EXIF']['Model'];
                photo_exif.orientation = data.info['Profile-EXIF']['Orientation'];
                photo_exif.xresolution = data.info['Profile-EXIF']['X Resolution'];
                photo_exif.yresolution = data.info['Profile-EXIF']['Y Resolution'];
                photo_exif.resolutionUnit = data.info['Profile-EXIF']['Resolution Unit'];
                photo_exif.datatime = data.info['Profile-EXIF']['Date Time'];
                photo_exif.ycbcrorientation = data.info['Profile-EXIF']['Y Cb Cr Positioning'];
                //            'Exif Offset';
                photo_exif.exposureTime = data.info['Profile-EXIF']['Exposure Time'];
                photo_exif.apertureValue = data.info['Profile-EXIF']['Aperture Value'];
                photo_exif.fnumber = data.info['Profile-EXIF']['F Number'];
                photo_exif.exposureProgram = data.info['Profile-EXIF']['Exposure Program'];
                photo_exif.isoSpeedRating = data.info['Profile-EXIF']['ISO Speed Ratings'];
                photo_exif.exifVersion = data.info['Profile-EXIF']['Exif Version'];
                photo_exif.datetimeOriginal = data.info['Profile-EXIF']['Date Time Original'];
                photo_exif.datetimeDigitized = data.info['Profile-EXIF']['Date Time Digitized'];
                photo_exif.componentConfigure = data.info['Profile-EXIF']['Components Configuration'];
                photo_exif.shutterspeedvalue = data.info['Profile-EXIF']['Shutter Speed Value'];
                photo_exif.exposureCompenstatvalue = data.info['Profile-EXIF']['Exposure Bias Value'];
                photo_exif.testLightMode = data.info['Profile-EXIF']['Metering Mode'];
                photo_exif.flashlamp = data.info['Profile-EXIF'].Flash;
                photo_exif.focalLength = data.info['Profile-EXIF']['Focal Length'];
                //            'Sub Sec Time': '09',
                //            'Sub Sec Time Original': '09',
                //            'Sub Sec Time Digitized': '09',

                photo_exif.flashPixVersion = data.info['Profile-EXIF']['Flash Pix Version'];
                photo_exif.exifColor = data.info['Profile-EXIF']['Color Space'];
                photo_exif.imagewidth = data.info['Profile-EXIF']['Exif Image Width'];
                photo_exif.imageheight = data.info['Profile-EXIF']['Exif Image Length'];
                photo_exif.sensorMethod = data.info['Profile-EXIF']['Sensing Method'];
                photo_exif.sceneType = data.info['Profile-EXIF']['Scene Type'];
                //            'Interoperability Offset': '12392',
                photo_exif.xfocalPlaneResolution = data.info['Profile-EXIF']['Focal PlaneX Resolution'];
                photo_exif.yfocalPlaneResolution = data.info['Profile-EXIF']['Focal PlaneY Resolution'];
                photo_exif.focalPlaneResolutionunit = data.info['Profile-EXIF']['Focal Plane Resolution Unit'];
                //            'Custom Rendered': '0',
                photo_exif.exposuremode = data.info['Profile-EXIF']['Exposure Mode'];
                //            'White Balance': '0',
                //            photo_exif.sceneType = data.info['Profile-EXIF']['Scene Capture Type'];
                //            photo_exif.maxApertureRatiovalue = data.info['Profile-EXIF'][''];
                //            photo_exif.lamphouse = data.info['Profile-EXIF'][''];
                //            photo_exif.apixcompressValue = data.info['Profile-EXIF'][''];
                //            photo_exif.fileSource = data.info['Profile-EXIF'][''];
                //            photo_exif.software = data.info['Profile-EXIF']['Software'];
                //            photo_exif.lightenessValue = data.info['Profile-EXIF']['Brightness Value'];
                //            photo_exif.subjectdistance = data.info['Profile-EXIF'][''];

                //            photo_exif.gpsversion = data.info['Profile-EXIF'][''];
                photo_exif.gpslatitude = geo_conver(data.info['Profile-EXIF']['GPS Latitude']);
                photo_exif.gpslatitudeRef = data.info['Profile-EXIF']['GPS Latitude Ref'];
                photo_exif.gpslongitude = geo_conver(data.info['Profile-EXIF']['GPS Longitude']);
                photo_exif.gpslongitudeRef = data.info['Profile-EXIF']['GPS Longitude Ref'];
                photo_exif.gpsaltitudeRef = data.info['Profile-EXIF']['GPS Altitude Ref'];
                photo_exif.gpsaltitude = data.info['Profile-EXIF']['GPS Altitude'];
                photo_exif.gpstimeStamp = data.info['Profile-EXIF']['GPS Time Stamp'];
                photo_exif.gpsspeedRef = data.info['Profile-EXIF']['GPS Speed Ref'];
                photo_exif.gpsspeed = data.info['Profile-EXIF']['GPS Speed'];
                photo_exif.gpsimgDirectionRef = data.info['Profile-EXIF']['GPS Img Direction Ref'];
                photo_exif.gpsimgDirection = data.info['Profile-EXIF']['GPS Img Direction'];
                photo_exif.gpsdateStamp = data.info['Profile-EXIF']['GPS Date Stamp'];
                //            photo_exif.gpssatellites = data.info['Profile-EXIF'][''];
                //            photo_exif.gpsstatus = data.info['Profile-EXIF'][''];
                //            photo_exif.gpsmeasureMode = data.info['Profile-EXIF'][''];
                //            photo_exif.gpsdop = data.info['Profile-EXIF'][''];
                //            photo_exif.gpsspeedRef = data.info['Profile-EXIF'][''];
                //            photo_exif.gpstrack = data.info['Profile-EXIF'][''];
                //            photo_exif.gpsmapDatum = data.info['Profile-EXIF'][''];
                //            photo_exif.gpsareaInformation = data.info['Profile-EXIF'][''];

                //            'GPS Dest Bearing Ref': 'T',
                //            'GPS Dest Bearing': '62720/187',

            }

        }

        let photo_preview_file = {};
        photo_preview_file.storageSchemeId = store.id;
        photo_preview_file.highWmPath = photo_files.high_wm;
        photo_preview_file.middleWmPath = photo_files.middle_wm;
        photo_preview_file.lowWmPath = photo_files.low_wm;
        photo_preview_file.thumbWmPath = photo_files.thumb_wm;
//            photo_preview_file.high_file_size = 99999;
//            photo_preview_file.middle_file_size = 99999;
//            photo_preview_file.low_file_size = 99999;
//            photo_preview_file.thumb_file_size = 99999;

        let true_photo_file = {};
        true_photo_file.storageSchemeId = store.id;
        true_photo_file.rawPath = photo_files.raw;
        true_photo_file.highPath = photo_files.high;
        true_photo_file.highPngPath = photo_files.high_png;
        true_photo_file.highPsdPath = photo_files.high_psd;
        true_photo_file.rawFileSize = file.size;
//            true_photo_file.high_file_size = 99999;
//            true_photo_file.high_psd_file_size = 99999;
//            true_photo_file.high_png_file_size = 99999;

        photo.fileSize = file.size;
        content.mediaInfoJson = photo.mediaInfoJson =
            {
                storageSchemeId: photo_preview_file.storageSchemeId
                , mediaType: "3"
                , thumbWmPath: photo_preview_file.thumbWmPath
                , middleWmPath: photo_preview_file.middleWmPath
                , lowWmPath: photo_preview_file.lowWmPath
                , highWmPath: photo_preview_file.highWmPath
                , size: true_photo_file.rawFileSize
                , width: photo.width
                , height: photo.height
                , colorDepth: photo.colorDepth
                , orientation: photo.orientation
                , colorSp: photo.colorSp
            };

        //todo 文件显示机制写好之后，考虑重写 mediaInfoJson

        //原始gps坐标
        if (photo_exif.gpslongitude) {
            content.localLon = photo_exif.gpslongitude;
            content.localLat = photo_exif.gpslatitude;
            content.localType = 0;
        }

        service.add_photo({
            userInfo: userInfo
            , content: content
            , contentOther: contentOther
            , photo: photo
            , photo_exif: photo_exif
            , photo_preview_file: photo_preview_file
            , true_photo_file: true_photo_file
        }, session, function (result) {
            //console.info(result);
            if (common.api_tools.check_result(result)) {
                //增加位置轉換任務
                if (photo_exif.gpslongitude)
                    service.push_geo(result.data.id, photo_exif.gpslongitude, photo_exif.gpslatitude);

                if (!udata.wire) {
                    fs.unlink(file.path, function (err) {
                        if (err) {
                            console.error(err);
                        }
                    });
                }
            }
            cb(result);

        });


    }


    userInfo.type = session.userinfo.user.type;
    userInfo.name = session.userinfo.user.name;


    content.creatorId = session.userinfo.user.id;
    content.modifierId = session.userinfo.user.id;

    if (content_id)
        content.id = content_id;
    else {

        if (udata.wire) {
            content.title = udata.wire.title;
            content.description = udata.wire.description;
            content.keyword = udata.wire.keyword;
            //content.class = udata.wire.class;
            content.eventTime = udata.wire.eventTime;
            //content.flagImportanceId = udata.wire.importance;
            content.sourceId = udata.wire.sourceId;
            content.rank = udata.wire.contentRank;
            content.statusId = udata.wire.statusId;
            contentOther.classList = udata.wire.classList;
            contentOther.newsEvent = udata.wire.event;//{title:"外电导入事件标题",eventTime:"2015-04-05 11:14:00"};
            contentOther.statusCode = udata.wire.statusCode;
            content.eventSortNum = parseInt(udata.wire.eventSortNum, 10);
        }
        else {
            content.title = path.basename(file.name);
            // content.description = content.title;

            //todo 用戶上傳處理正確的來源
            if (session.userinfo.user.sourceId)
                content.sourceId = session.userinfo.user.sourceId;
            else
                content.sourceId = 1;// 本地上传。

            if (session.userinfo.user.type == 0) {
                if (session.userinfo.user.department) {
                    userInfo.source = session.userinfo.user.department.name;
                }
            } else {
                if (session.userinfo.user.customer) {
                    userInfo.source = session.userinfo.user.customer.name;
                }
            }
        }
        content.name = content.title;

        content.libraryId = lib_id;
    }

    //content.createTime = new Date();


    let pathname = Math.round(Math.random() * 1000) % 256 + "/" + Math.round(Math.random() * 1000) % 256 + '/' + uuid();
    let store = store_manager.get_by_lib(lib_id);
    if (store === null) {
        cb({
            code: 'error',
            msg: 'store not exists'
        });
        return;

    }
    console.log("1");
    if (file.type.indexOf('image') >= 0 || is_image(path.extname(file.path))) {
        content.mediaType = 3;
        let ext = path.extname(file.path).toLowerCase();
        let newext = ext;
        if (ext != ".gif") {
            newext = ".jpg";
        }
        let photo_files = {
            source: file.path,
            raw: is_update ? undefined : pathname + '/raw' + path.extname(file.path).toLowerCase(),
            high: pathname + '/high' + newext,
//            high_png: pathname + '/high.png',
            middle: pathname + '/middle' + newext,
            high_psd: pathname + '/high.psd',
            high_wm: pathname + '/high_wm' + newext,
            middle_wm: pathname + '/middle_wm' + newext,
            low_wm: pathname + '/low_wm' + newext,
            thumb_wm: pathname + '/thumb_wm' + newext,
        };
        //


        if (udata.wire) {
            process_wire_photo(photo_files, store, after_process_photo);
        }
        else if (udata.source === 'online_edit') {
            process_online_photo(photo_files, store, after_process_photo);
        }
        else if (udata.source === 'photoshop_edit') {
            process_photoshop_photo(photo_files, store, after_process_photo);
        }
        else
            process_photo(photo_files, store, after_process_photo);

    }
    else if (file.type.indexOf('audio') >= 0 || path.extname(file.path).toLowerCase() === '.mp3') {
        content.mediaType = 4;
        let media = {};
        media.fileSize = file.size;
        media.storageSchemeId = store.id;
        media.extname = path.extname(file.name).substr(1);
        media.filename = 'audio.' + media.extname;
        media.path = pathname + '/' + media.filename;
        media.md5 = '';
        media.name = file.name;
        media.timestamps = 0;
        content.mediaInfoJson = media.mediaInfoJson =
            {
                mediaType: content.mediaType
                , storageSchemeId: store.id
                , path: media.path
                , filename: media.filename
                , extname: media.extname
                , fileSize: media.fileSize
                , timestamps: media.timestamps

            };

        let buf = fs.readFileSync(file.path);
        store.audio.write_file(media.path, buf, function (err) {
            if (err != null) {

            }
            else
                service.add_audio({
                    userInfo: userInfo
                    , content: content
                    , media: media
                }, session, function (result) {
                    //console.info(result);
                    if (common.api_tools.check_result(result)) {

                        if (!udata.wire) {
                            fs.unlink(file.path, function (err) {
                                if (err) {
                                    console.error(err);
                                }
                            });
                        }
                    }
                    cb(result);

                });

        });

    }
    else if (file.type.indexOf('video') >= 0 || path.extname(file.path).toLowerCase() === '.mp4') {
        content.mediaType = 5;
        let media = {};
        media.fileSize = file.size;
        media.storageSchemeId = store.id;
        media.extname = path.extname(file.name).substr(1);
        media.filename = 'video.' + media.extname;
        media.path = pathname + '/' + media.filename;
        media.md5 = '';
        media.name = file.name;
        media.width = 0;
        media.height = 0;
        media.frameCount = 0;
        media.timestamps = 0;
        content.mediaInfoJson = media.mediaInfoJson =
            {
                mediaType: content.mediaType
                , storageSchemeId: store.id
                , path: media.path
                , filename: media.filename
                , extname: media.extname
                , fileSize: media.fileSize
                , width: media.width
                , height: media.height
                , frameCount: media.frameCount
                , timestamps: media.timestamps

            };

        let buf = fs.readFileSync(file.path);
        store.video.write_file(media.path, buf, function (err) {
            if (err != null) {

            }
            else
                service.add_video({
                    userInfo: userInfo
                    , content: content
                    , media: media
                }, session, function (result) {
                    // console.info(result);
                    if (common.api_tools.check_result(result)) {

                        if (!udata.wire) {
                            fs.unlink(file.path, function (err) {
                                if (err) {
                                    console.error(err);
                                }
                            });
                        }
                    }
                    cb(result);

                });

        });

    }
    else {
        content.mediaType = 9;
        let media = {};
        media.fileSize = file.size;
        media.storageSchemeId = store.id;
        media.extname = path.extname(file.name).substr(1);
        media.filename = 'doc.' + media.extname;
        media.path = pathname + '/' + media.filename;
        media.md5 = '';
        media.name = file.name;
        content.mediaInfoJson = media.mediaInfoJson =
            {
                mediaType: content.mediaType
                , storageSchemeId: store.id
                , path: media.path
                , filename: media.filename
                , extname: media.extname
                , fileSize: media.fileSize

            };

        let buf = fs.readFileSync(file.path);
        store.other.write_file(media.path, buf, function (err) {
            if (err != null) {

            }
            else
                service.add_doc({
                    userInfo: userInfo
                    , content: content
                    , media: media
                }, session, function (result) {
                    // console.info(result);
                    if (common.api_tools.check_result(result)) {

                        if (!udata.wire) {
                            fs.unlink(file.path, function (err) {
                                if (err) {
                                    console.error(err);
                                }
                            });
                        }
                    }
                    cb(result);

                });

        });


    }


//        let _file = JSON.parse(JSON.stringify(file));
//        _file.url = _file.path.replace(path.join(config.files_root,'media'),'/media/files');
//        _file.url = _file.url.replace(/\\/g,'/');
//        chat_log.content = _file;//JSON.stringify(_file);
//
//        return chat_log;
};

module.exports.add_doc =
    function (data, session, callback) {
        let url = common.api_tools.gen_url('/doc');
        //console.info(data);
        common.service_tools.post(config.service_url_base + url, data, session, callback);
//        callback({code:'success'});
    };

module.exports.add_video =
    function (data, session, callback) {
        let url = common.api_tools.gen_url('/video');
        //console.info(data);
        common.service_tools.post(config.service_url_base + url, data, session, callback);
//        callback({code:'success'});
    };

module.exports.add_audio =
    function (data, session, callback) {
        let url = common.api_tools.gen_url('/audio');
        //console.info(data);
        common.service_tools.post(config.service_url_base + url, data, session, callback);
//        callback({code:'success'});
    };


module.exports.add_photo =
    function (data, session, callback) {
        let url = common.api_tools.gen_url('/photo');
        common.service_tools.post(config.service_url_base + url, data, session, callback);
    };

module.exports.update_baidu_geo =
    function (data, session, callback) {
        let url = common.api_tools.gen_url('/content/updateBaiduGeo');
        common.service_tools.post(config.service_url_base + url, data, session, callback);
    };

module.exports.push_geo =
    function (id, lon, lat) {
        if (config.is_main) {
            if (lon && lat) {
                geo_list.push({
                    id: id,
                    lon: lon,
                    lat: lat,
                    from: 1
                });
            }
        }
    };


let geo_list = [];
let bp = require('baidu-map')({ak: 'LDa4usaUfSuM093eq8rZ6OxQ', sk: '0kGRa55eL9Ut0D7f01vvqWsiacyjeaDz'});
let count = 0;


function get_baidu_geo_service_old() {
    if (count > 0)
        return;

    let coords = '';
    for (count = 0; count < geo_list.length && count < 100; count++) {
        coords = coords + geo_list[count].lon + ',' + geo_list[count].lat;
    }
    if (count > 0)
        bp.geoconv({
            from: 1,
            to: 5,
            coords: coords
        }, function (err, data) {
            if (err === null && data.status == 0) {
                let update_obj = {datas: []};
                for (let i = 0; i < count; i++) {
                    update_obj.datas.push({
                        contentId: geo_list[i].id,
                        lng: data.result[i].x,
                        lat: data.result[i].y,
                        type: 1
                    });
                }

                service.update_baidu_geo(update_obj, {id: "system"}, function (result) {
                    if (common.api_tools.check_result(result)) {

                        //回調成功后把數據刪除， count 清零
                        geo_list.splice(0, count);
                        count = 0;
                    }

                });

                //console.info(update_obj);
            }
        });
}

//by zlz 20161108 一个一个转换，批量转换，任意一个错误会导致全部转换错误
//先处理from=1, 再尝试from=3 其实不尝试
let running = false;

function get_baidu_geo_service() {
    if (running)
        return;
    running = true;

    try {
        if (geo_list.length == 0) {
            return;
        }
        let list = geo_list.slice(0, Math.min(100, geo_list.length));
        async.forEach(list, function (item, callback) {
            //console.log("geo convert : ", item);
            //by zlz 20161107  一个一个处理， 因为任何一个GPS点转换错误，整体都会失败
            let coords = item.lon + ',' + item.lat;
            bp.geoconv({
                from: item.from,
                to: 5,
                coords: coords
            }, function (err, data) {
                if (err) {
                    console.error("bd.geoconv error :", item, err);
                    return;
                } else {
                    //console.info("bd.geoconv data: ", coords, data);
                }
                if (!err && data.status == 0) {
                    callback();
                    let update_obj = {datas: []};
                    update_obj.datas.push({
                        contentId: item.id,
                        lng: data.result[0].x,
                        lat: data.result[0].y,
                        type: 1
                    });

                    service.update_baidu_geo(update_obj, {id: "system"}, function (result) {
                        if (common.api_tools.check_result(result)) {

                        }
                    });

                } else {
                    /**
                     * 取值为如下：
                     1：GPS设备获取的角度坐标，wgs84坐标;
                     2：GPS获取的米制坐标、sogou地图所用坐标;
                     3：google地图、soso地图、aliyun地图、mapabc地图和amap地图所用坐标，国测局坐标;
                     4：3中列表地图坐标对应的米制坐标;
                     5：百度地图采用的经纬度坐标;
                     6：百度地图采用的米制坐标;
                     7：mapbar地图坐标;
                     8：51地图坐标
                     */
                    //如果1未处理成功，则尝试处理3类型，如果3类型处理失败，则不再处理
                    if (item.from >= 3) {

                    } else {
                        item.from = 3;
                        geo_list.push(item);
                    }
                    callback();
                }
            });
        }, function (err) {

        });
        //
        // while (geo_list.length > 0) {
        //     count++;
        //     if (count > 100){
        //         break;
        //     }
        //     let item = geo_list.shift();//这里存在异步问题，不能用
        //     console.log("geo convert : ", item);
        //     //by zlz 20161107  一个一个处理， 因为任何一个GPS点转换错误，整体都会失败
        //     let coords = item.lon + ',' + item.lat;
        //     bp.geoconv({
        //         from: item.from,
        //         to: 5,
        //         coords: coords
        //     }, function (err, data) {
        //         if (err) {
        //             console.error("bd.geoconv error :", item.from, coords, err);
        //         } else {
        //             console.info("bd.geoconv data: ", coords, data);
        //         }
        //         if (!err && data.status == 0) {
        //             let update_obj = {datas: []};
        //             update_obj.datas.push({
        //                 contentId: item.id,
        //                 lng: data.result[0].x,
        //                 lat: data.result[0].y,
        //                 type: 1
        //             });
        //
        //
        //             service.update_baidu_geo(update_obj, {id: "system"}, function (result) {
        //                 if (common.api_tools.check_result(result)) {
        //
        //                 }
        //             });
        //
        //         } else {
        //             /**
        //              * 取值为如下：
        //              1：GPS设备获取的角度坐标，wgs84坐标;
        //              2：GPS获取的米制坐标、sogou地图所用坐标;
        //              3：google地图、soso地图、aliyun地图、mapabc地图和amap地图所用坐标，国测局坐标;
        //              4：3中列表地图坐标对应的米制坐标;
        //              5：百度地图采用的经纬度坐标;
        //              6：百度地图采用的米制坐标;
        //              7：mapbar地图坐标;
        //              8：51地图坐标
        //              */
        //             //如果1未处理成功，则尝试处理3类型，如果3类型处理失败，则不再处理
        //             if (item.from >= 3) {
        //
        //             } else {
        //                 item.from = 3;
        //                 geo_list.push(item);
        //             }
        //
        //         }
        //     });
        // }
        // ;
    } finally {
        running = false;
    }
}

setInterval(function () {
    if (config.is_main) {
        get_baidu_geo_service();
    }
}, 10 * 1000);


//測試代碼
//let bp = require('baidu-map')({ak:'LDa4usaUfSuM093eq8rZ6OxQ',sk:'0kGRa55eL9Ut0D7f01vvqWsiacyjeaDz'});
//let tt = new Date();
//bp.geoconv({
//    from:1,
//    to:5,
//    coords:'113.50611944444445,22.22767222222222'
//},function(err,data){
//    console.info(data);
//    console.info((new Date()) - tt);
//
//});
