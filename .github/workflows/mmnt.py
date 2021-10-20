import urllib.parse
import urllib.request
import datetime
import os


MSG_TEMPLATE = """
Today: {today}
-{p} days +{f}
-{pw} weeks +{fw}
-{pm} months +{fm}
-{py} years +{fy}
-{rp} % +{rf}
"""


def send_message(txt):
    chat_id = os.environ['CHAT_ID']
    bot_key = os.environ['BOT_KEY']
    params = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': txt
    })
    url = f'https://api.telegram.org/bot{bot_key}/sendMessage?{params}'
    return urllib.request.urlopen(url)


def date(ymd):
    return datetime.date(*map(int, ymd.split('-')))


def main():
    d1 = date(os.environ['DATE_FROM'])
    d2 = date(os.environ['DATE_TO'])
    dt = datetime.date.today()
    p = (dt - d1).days
    f = (d2 - dt).days
    pw = round(p/7)
    fw = round(f/7)
    pm = round(p/365.25*12)
    fm = round(f/365.25*12)
    py = round(p/365.25, 1)
    fy = round(f/365.25, 1)
    rp = round(100.0*p/(p+f), 2)
    rf = round(100.0*f/(p+f), 2)

    msg = MSG_TEMPLATE.format(p=p, f=f, rp=rp, rf=rf, pm=pm, fm=fm,
                              py=py, fy=fy, pw=pw, fw=fw, today=dt)
    result = send_message(msg)
    return result


if __name__ == '__main__':
    main()
