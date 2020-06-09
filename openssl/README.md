# 生成SSL证书

第一步: 生成服务端公钥、私钥

    # 生成服务器私钥
    openssl genrsa -out server.key 1024

    # 生成服务器公钥
    openssl rsa -in server.key -pubout -out server.pem

第二步: 生成CA证书

    # 生成CA私钥
    openssl genrsa -out ca.key 1024

    # 证书签名证书csr
    openssl req -new -key ca.key -out ca.csr

    # 证书数据管理
    openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt

第三步: 生成服务器端证书
    
    # 服务端需要向CA机构申请签名证书,在申请签名之前依然是创建自己的CSR文件
    openssl req -new -key server.key -out server.csr
    
    # 向自己的CA机构申请证书,签名过程需要CA的证书和私钥参与,最终颁发一个带有CA签名的证书
    openssl x509 -CA ca.crt -CAkey ca.key -CAcreateserial -in server.csr -out server.crt
