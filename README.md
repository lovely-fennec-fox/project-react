# 개발 환경

##### 소스코드 작성도구 / 데이터베이스 / 형상관리도구

- Visual Studio Code

- MySQL server 8.0.16 / MongoDB

- Github

<br>

## `FronEnd`

##### Language / Framwork

- JavaScript, HTML5, CSS3

- React, jQuery

## `BackEnd`

##### Language / Framwork

- JavaScript

- Node.js

<br>

<br>
<br>

# 사이트 설명

### - 게임에 있는 머니를 다른 게임의 머니로 교환 할 수있는 플랫폼(Nexon서비스 게임으로 한정)
<br>
<br>


## `분석, 설계 과정`
###  Trello주소 : [https://trello.com/b/sZ4Kfd5h/project](https://trello.com/b/sZ4Kfd5h/project)

<br>
<br>

### `[ 회원 가입 ]`

#### 1. 넥슨 이메일 인증(가상) : 임의의 4자리 코드를 생성하여 이메일에서 인증
<br>
<img src="/ppt/gif/회원가입_01.gif" width="800" height="400">

<br>
<img src="/ppt/gif/회원가입_02.gif" width="800" height="400">

<br>

#### 2. 이메일 인증 구현 : crypto 모듈을 이용하여 암호문 생성 후 링크 생성하여, 회원의 이메일로 보내기
<br>

<img src="/ppt/gif/회원가입_03.gif" width="800" height="400">
<br>

<img src="/ppt/gif/회원가입_04.gif" width="800" height="400">
<br>
<br>

### `[ 로그인 ]`

#### 1. 로그인 횟수 제한 : 로그인 오류 5회 발생하면, 60초 동안 로그인 불가하도록 구현

<img src="/ppt/gif/로그인_횟수제한_01.gif" width="800" height="400">
<br>

#### 2. SQL 인젝션 방어 : 정규식 사용으로 입력 값 검증함

<img src="/ppt/gif/sql-injection_01.gif" width="800" height="400">
<br>

#### 3. 로그인 전에는 메인페이지의 정보 접근 할 수 없도록 구현

<img src="/ppt/gif/로그인_전_01.gif" width="800" height="400">
<br>
<br>

### `[ 회원정보수정 ]`

#### 1. 파일 업로드 기능 구현

<img src="/ppt/gif/회원정보수정_01.gif" width="800" height="400">
<br>

#### 2. 비밀번호 변경기능 구현

<img src="/ppt/gif/회원정보수정_02.gif" width="800" height="400">
<br>
<br>

### `[ 환전페이지 ]`

#### 1. 회원이 가진 게임리스트들을 볼 수 있고, 게임별 캐릭터가 가진 금액을 확인하고 변경할 수 있다. 

<img src="/ppt/gif/환전_01.gif" width="800" height="400">
<br>

#### 2. 플랫폼머니로 환전 할 시

<img src="/ppt/gif/환전_02.gif" width="800" height="400">
<br>

#### 3. 게임머니로 환전 할 시

<img src="/ppt/gif/환전_04.gif" width="800" height="400">
<br>
<br>
