function FindProxyForURL(url, host) {
    /*
    if(shExpMatch(host, "(*ank.ru*)") || shExpMatch(host, "(*eppel*)") || shExpMatch(host, "(*linked*)")){
        return "SOCKS5 127.0.0.1:3128";
    }
    */
    if(isInNet(host, "10.0.0.0", "255.0.0.0")){
        return "SOCKS5 127.0.0.1:3128";
    }
    return "DIRECT";
}
