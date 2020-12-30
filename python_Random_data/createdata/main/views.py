import random
import string

class CreateUser:

    def __init__(self, *args, **kwargs):
        self.game_name = ['메이플스토리', '메이플스토리2', '던전앤파이터', '마비노기', '천애명월도', '테일즈위버', '바람의나라', '아키에이지', '테라', '엘소드']
        self.user_name = ''
        self.user_email = ''
        self.nick_name = ''
        self.money = ''

    def create_username(self):
        # 5~9개 단어
        name_word_num = random.randrange(5, 10)
        self.user_name = ''.join(random.choice(string.ascii_lowercase + string.ascii_uppercase + string.digits) for _ in range(name_word_num))

        return self.user_name

    def create_email(self):
        email_word_num = random.randrange(5, 10)
        self.user_email = ''.join(random.choice(string.ascii_lowercase + string.ascii_uppercase + string.digits) for _ in range(email_word_num))
        self.user_email = self.user_email + '@nexon.com'

        return self.user_email

    def create_character(self, game):
        character = {}
        nick_name_word_num = random.randrange(5, 10)

        self.nick_name = ''.join(random.choice(string.ascii_lowercase + string.ascii_uppercase + string.digits) for _ in range(nick_name_word_num))
        print(game)
        print(type(game))

        # 메이플, 아키에이지, 엘소드 [최대 100,000,000,000원], [최소 10,000원]
        # 테일즈위버, 바람의나라, 메이플스토리2 [최대 50,000,000,000원], [최소 10,000원]
        # 던전앤파이터, 마비노기, 천애명월도 최대 [최대 10,000,000,000원], [최소 1,000원]
        # 테라 최대 [최대 1,000,000,000원],[최소 10원]

        if game == '메이플' or game == '아키에이지' or game == '엘소드':
            self.money = random.randrange(1, 10000000) * 10000

        elif game == '테일즈위버' or game == '바람의나라' or game == '메이플스토리2':
            self.money = random.randrange(1, 5000000) * 10000

        elif game == '던전앤파이터' or game == '마비노기' or game == '천애명월도':
            self.money = random.randrange(1, 10000000) * 1000

        elif game == '테라':
            self.money = random.randrange(1, 100000000) * 10
            print(self.money)
            print('a')

        character['NickName'] = self.nick_name
        character['Money'] = self.money

        return character


    def create_user(self, num):
        user = {}
        user_email = self.create_email()
        user[str(num)] = {}

        # email: ..@nexon.com
        user[str(num)]['email'] = user_email

        # game: 1~10, character: 1~3
        game_range = random.randrange(1, 11)


        # 게임: {}
        for game_num in range(game_range):
            select_game = random.choice(self.game_name)
            user[str(num)][select_game] = []
            character_range = random.randrange(1, 4)
        # 캐릭터 list
            for character_num in range(character_range):
                user[str(num)][select_game].append(self.create_character(select_game))

        return user




if __name__ == "__main__":

    user = CreateUser()

    for i in range(0, 100):
        data = user.create_user(i)
        f = open('/Users/apple/Python/Random_data/createdata/main/data', 'a')
        f.write(str(data) + '\n')

    f.close()