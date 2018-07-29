function get_client_ip(req) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    ip = ip.replace(/::ffff:/, "");
    if (ip === "::1") {
        ip = "127.0.0.1";
    }
    var ips = ip.split(",");
    return ips[0];
}