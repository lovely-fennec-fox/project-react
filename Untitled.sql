use MONEYEXCHANGE;
ALTER TABLE Games_TB ADD COLUMN game_intro VARCHAR(500);


insert into Games_TB (name_game, image_path) value('메이플스토리', "./jpg/maplestory.jpg" );
UPDATE Games_TB SET game_intro = '메이플스토리는 메이플 월드에서 몬스터를 무찌르며 모험을 해 나가는 횡 스크롤 2D 액션 타입의 MMORPG입니다. 전세계 60개국 1억명 이상이 즐기고 있습니다. 다양한 직업의 캐릭터로 모험을 떠나보세요.' WHERE name_game= '메이플스토리';
UPDATE Games_TB SET game_intro = '메이플스토리를 풀 3D로 즐길 수 있는 메이플스토리2는 쿼터뷰 방식의 MMORPG 입니다.' WHERE name_game= '메이플스토리2';
UPDATE Games_TB SET game_intro =  '던전앤파이터는 다채로운 스킬과 무기를 구사하여 위기에 처한 아라드 대륙을 구하기 위한 모험을 떠나는 2D 횡 스크롤 타입의 액션 RPG입니다.  최고 보스 몬스터를 사냥하여 아라드 대륙 최고의 모험가가 되어보세요!' WHERE name_game= '던전앤파이터';
UPDATE Games_TB SET game_intro = '마비노기는 지루하게 반복되는 싸움 대신 누구나 쉽게 교감과 소통, 이해와 사랑이 있는 판타지 세계에서의 낭만을 체험할 수 있는 RPG 입니다.' WHERE name_game= '마비노기';
UPDATE Games_TB SET game_intro = '천애명월도는 중국 3대 무협 작가 "고룡"의 원작을 바탕으로 제작하여 강호의 삶을 진실되게 그려낸 진정한 무협 PC MMORPG 입니다.' WHERE name_game= '천애명월도';
UPDATE Games_TB SET game_intro = '테일즈위버는 인기 판타지소설 "룬의 아이들" 원작의 드라마틱 액션 RPG의 원조로, 아기자기한 2D그래픽과 개성있는 캐릭터, 중독성 높은 스토리가 핵심인 액션 RPG 입니다.' WHERE name_game= '테일즈위버';
UPDATE Games_TB SET game_intro = '바람의나라는 김진氏의 역사 서사극 바람의나라 원작으로 고구려 배경의 무휼과 연의 운명같은 러브스토리와 전쟁 이야기를 그린 세계 최초 MMORPG입니다.' WHERE name_game= '바람의나라';
UPDATE Games_TB SET game_intro = '아키에이지는 정해진 대로 따라가는 것이 아닌 스스로 선택하고 만들어가는 세상에서 흥미진진한 모험을 즐길 수 있는 MMORPG 입니다. 지금 모험을 시작하세요.' WHERE name_game= '아키에이지';
UPDATE Games_TB SET game_intro =  '테라는 논 타겟팅 액션 MMORPG로 최근 모바일로도 출시 됐을만 큼 큰 사랑을 받아온 온라인 게임입니다.' WHERE name_game= '테라';
UPDATE Games_TB SET game_intro = '엘소드는 박진감 있고 스피디한 액션 스타일리쉬 게임입니다. 스릴 넘치는 다이내믹한 액션과 화려한 스킬을 간단한 조작만으로도 누구나 쉽게 즐기실 수 있습니다.' WHERE name_game= '엘소드';


