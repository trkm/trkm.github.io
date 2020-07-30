function FindProxyForURL(url, host) {
    if(shExpMatch(host, "(*ank.ru*)") || shExpMatch(host, "(*eppel*)") || shExpMatch(host, "(*linked*)") || shExpMatch(host, "(*10.*)")){
        return "SOCKS5 127.0.0.1:3128";
    }
    return "DIRECT";
}
