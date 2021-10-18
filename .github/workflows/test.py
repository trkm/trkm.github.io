import os


def main():
    secret = os.environ['TEST']
    print(f'hello! sec=[{secret}] sec.len={len(secret)}')


if __name__ == '__main__':
    main()
