function FindProxyForURL(url, host) {
    if (shExpMatch(host, "(*ank.ru*)")){
        return "SOCKS5 127.0.0.1:3128";
    }
    return "DIRECT";
}
