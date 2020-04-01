path = './sample/test.rle'

def get_x_y(text) :
    line = text[1]
    line = line.split(' ')
    print(line)
    x = line[2]
    y = line[5]
    x = x.replace(',', '')
    y = y.replace(',', '')
    return x, y

def lexical_analysis (code) :
    tokens = []

    init_buffer = ''
    number_buffer = init_buffer

    for c in code:
        if c in {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'}:
            # バッファに保存
            number_buffer += c
        else:
            if number_buffer != init_buffer :
                # 数値出力 バッファ初期化 
                num = int(number_buffer)
                tokens.append(num)
                number_buffer = init_buffer

            if c == 'b':
                tokens.append(c)
            elif c == 'o':
                tokens.append(c)
            elif c == '$':
                tokens.append(c)
            elif c == '!':
                tokens.append(c)
    
    return tokens
    

def get_tokens(text):
    compressed_code = text[2]
    tokens = lexical_analysis(compressed_code)
    return tokens

def convert_bitmap(tokens, x, y):
    bitmaps = []
    init_line = []
    line = init_line
    init_c = 1
    c = init_c

    alive_bit = 1
    dead_bit = 0

    for token in tokens:
        if isinstance(token, int):
            c = token
        else:
            if token == 'o':
                for i in range(c):
                    line.append(alive_bit)
                c = init_c
            elif token == 'b':
                for i in range(c):
                    line.append(dead_bit)
                c = init_c
            elif token == '$':
                for i in range(c):
                    line_len = len(line)
                    len_diff = int(x) - line_len
                    if len_diff > 0 :
                        for l in range(len_diff):
                            line.append(dead_bit)
                    bitmaps.append(line)
                    line = []
            elif token == '!':
                bitmaps.append(line)
                print('analysis end')

    print(bitmaps)
    return bitmaps


def main ():
    text = ''
    with open(path) as f:
        text = f.readlines()

    tokens = get_tokens(text)

    x, y = get_x_y(text)
    bitmap = convert_bitmap(tokens, x, y)

main()

