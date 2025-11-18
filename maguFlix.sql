CREATE DATABASE IF NOT EXISTS filminis;
USE filminis;

CREATE TABLE Nacionalidade(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Diretor(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    sobrenome VARCHAR(255) NOT NULL,
    url_foto TEXT NULL 
);


CREATE TABLE Ator(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    sobrenome VARCHAR(255) NOT NULL,
    url_foto TEXT NULL 
);


CREATE TABLE Pais(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Linguagem(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Produtora(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Genero(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL UNIQUE
);


CREATE TABLE Filme(
	id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    sinopse TEXT NULL, 
    orcamento DECIMAL(15, 2) NOT NULL,
    tempo_duracao TIME NOT NULL,
    ano_lancamento YEAR(4), 
    url_poster TEXT, 
    url_capa TEXT NULL 
);


CREATE TABLE Filme_Genero(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_filme INT,
    id_genero INT,
    FOREIGN KEY(id_filme) REFERENCES Filme(id) ON DELETE CASCADE,
    FOREIGN KEY(id_genero) REFERENCES Genero(id) ON DELETE CASCADE
);

CREATE TABLE Filme_Diretor(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_filme INT,
    id_diretor INT,
    FOREIGN KEY(id_filme) REFERENCES Filme(id) ON DELETE CASCADE,
    FOREIGN KEY(id_diretor) REFERENCES Diretor(id) ON DELETE CASCADE
);

CREATE TABLE Filme_Ator(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_filme INT,
    id_ator INT,
    FOREIGN KEY(id_filme) REFERENCES Filme(id) ON DELETE CASCADE,
    FOREIGN KEY(id_ator) REFERENCES Ator(id) ON DELETE CASCADE
);

CREATE TABLE Filme_Pais(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_filme INT,
    id_pais INT,
    FOREIGN KEY(id_filme) REFERENCES Filme(id) ON DELETE CASCADE,
    FOREIGN KEY(id_pais) REFERENCES Pais(id) ON DELETE CASCADE
);

CREATE TABLE Filme_Linguagem(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_filme INT,
    id_linguagem INT,
    FOREIGN KEY(id_filme) REFERENCES Filme(id) ON DELETE CASCADE,
    FOREIGN KEY(id_linguagem) REFERENCES Linguagem(id) ON DELETE CASCADE
);

CREATE TABLE Filme_Produtora(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_filme INT,
    id_produtora INT,
    FOREIGN KEY(id_filme) REFERENCES Filme(id) ON DELETE CASCADE,
    FOREIGN KEY(id_produtora) REFERENCES Produtora(id) ON DELETE CASCADE
);

CREATE TABLE Ator_Nacionalidade(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_ator INT,
    id_nacionalidade INT,
    FOREIGN KEY (id_ator) REFERENCES Ator(id) ON DELETE CASCADE,
    FOREIGN KEY (id_nacionalidade) REFERENCES Nacionalidade(id) ON DELETE CASCADE
);

CREATE TABLE Diretor_Nacionalidade(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_diretor INT,
    id_nacionalidade INT,
    FOREIGN KEY (id_diretor) REFERENCES Diretor(id) ON DELETE CASCADE,
    FOREIGN KEY (id_nacionalidade) REFERENCES Nacionalidade(id) ON DELETE CASCADE
);


CREATE TABLE Usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(70) NOT NULL,
    sobrenome VARCHAR(70) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE, -- Campo novo (baseado no Figma)
    password_hash VARCHAR(255) NOT NULL, -- Renomeado de 'senha'
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER' -- Renomeado de 'level'
);

CREATE TABLE Solicitacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    tipo ENUM('ADICAO', 'EDICAO') NOT NULL, -- Tipo 'EXCLUSAO' removido
    status ENUM('PENDENTE', 'APROVADA', 'REJEITADA') DEFAULT 'PENDENTE',
    filme_id_alvo INT NULL, 
    payload JSON NOT NULL,
    data_solicitacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_decisao DATETIME NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (filme_id_alvo) REFERENCES Filme(id) ON DELETE SET NULL
);


INSERT INTO Filme(titulo, sinopse, orcamento, tempo_duracao, ano_lancamento, url_poster, url_capa)
VALUES
('Old Boy', 'Oh Dae-su é um homem comum, bem-casado e pai de uma menina de 3 anos, que é levado a uma delegacia por embriaguez. 
Ao sair, ele é sequestrado e mantido em cativeiro em um quarto de hotel por 15 anos, sem qualquer contato com o mundo exterior. 
Quando ele é finalmente libertado, descobre que sua esposa foi brutalmente assassinada e ele é o principal suspeito. 
Com a ajuda de uma jovem sushiman, ele busca vingança contra seu captor e tenta descobrir o motivo de seu longo aprisionamento.', 
3000000, '02:00:00', 2003, 'https://midias.jb.com.br/_midias/jpg/2023/09/22/oldboy__2_-784027.jpg', 
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlr4VtsYFU8NUo8-MQSiLWh4Txq64D990Oww&s'),

('Onde os fracos não tem vez', 
'Em 1980, no Texas, o veterano da Guerra do Vietnã, Llewelyn Moss, descobre uma cena de crime sangrenta, uma caminhonete cheia de heroína e dois milhões de dólares.
Ele decide pegar o dinheiro para si, desencadeando uma violenta cadeia de eventos. Moss passa a ser perseguido por Anton Chigurh, um assassino psicopata
 contratado para recuperar o dinheiro, enquanto o xerife Ed Tom Bell tenta proteger Moss e sua esposa.', 25000000, '02:02:00', 2008, 
 'https://m.media-amazon.com/images/S/pv-target-images/d3ace3a42566abd92090b2823b312711b6bab90e80240a5bfaac60bb65e06d81.jpg', 'https://imgs.jusbr.com/publications/artigo/432335326/embedded/1487609369197.jpg'),
 
('Gente Grande', 'Cinco amigos de infância, Lenny, Eric, Kurt, Marcus e Rob, se reencontram após trinta anos no funeral de seu treinador de basquete. 
Para homenagear o antigo mentor, eles decidem passar o fim de semana do feriado de 4 de julho com suas famílias na mesma casa do lago onde celebraram a 
vitória no campeonato quando eram jovens. O reencontro serve para que eles percebam que, embora mais velhos, não necessariamente amadureceram.',
 75000000, '01:42:00', 2010, 'https://upload.wikimedia.org/wikipedia/pt/f/fe/Grownupsmovie.jpg', 'https://rollingstone.com.br/wp-content/uploads/cena-de-gente-grande_reproducao_twitter.jpg'),
 
('LEGO batman: O filme', 'Batman, o solitário e egocêntrico vigilante de Gotham City, leva uma vida dupla combatendo o crime à noite e lidando com sua fama como o 
bilionário Bruce Wayne. Quando o Coringa arquiteta um plano para dominar a cidade, Batman é forçado a confrontar seu medo de ter uma família e a aprender a trabalhar em equipe.
 Ele acidentalmente adota o órfão Dick Grayson, que se torna o Robin, e precisa colaborar com a nova comissária Barbara Gordon, a Batgirl, para salvar Gotham.', 
 80000000, '01:44:00', 2017, 'https://m.media-amazon.com/images/M/MV5BMTcyNTEyOTY0M15BMl5BanBnXkFtZTgwOTAyNzU3MDI@._V1_FMjpg_UX1000_.jpg', 
 'https://www.papodecinema.com.br/wp-content/uploads/2017/02/20190207-banner.webp'),
 
('Faça ela voltar', 'Dois irmãos descobrem um ritual aterrorizante na casa de sua nova mãe adotiva. Um menino que já mora no local pode ter as respostas para o que está 
acontecendo, mas resta saber se ele será capaz de ajudar.', 
15000000, '01:39:00', 2025, 'https://m.media-amazon.com/images/M/MV5BMDI5ZDc3Y2UtMTIyNC00Zjc3LTk0ZGUtN2U0ZmNmYjYzOTE1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 
'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/04/faca-ela-voltar.png?w=852-0'),

('Kairo', 'Em Tóquio, estranhos eventos começam a ocorrer. Um jovem programador comete suicídio, deixando para trás um disquete misterioso. Seus amigos, ao investigarem, 
descobrem um site que parece conectar o mundo dos vivos com o dos mortos. Lentamente, uma epidemia de solidão e depressão se espalha pela cidade, à medida que fantasmas 
começam a invadir o mundo real através da internet, levando as pessoas ao isolamento e ao desespero.', 25000000, '01:58:00', 2001,
'https://m.media-amazon.com/images/M/MV5BMTdiMDUwYTYtN2YwYi00ODg3LTg3NmMtNDRjMjJmZjk0MjExXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 
'https://i0.wp.com/screenagewasteland.com/wp-content/uploads/2024/12/ff-pulse-kairo-1.jpg?resize=730%2C365&ssl=1'),

('Estômago', 'Raimundo Nonato, um humilde migrante nordestino, chega a São Paulo sem nada. Ele começa a trabalhar como faxineiro em um bar e logo descobre um talento 
extraordinário para a culinária, usando suas habilidades para transformar coxinhas em iguarias. Seu dom o leva a uma jornada de ascensão social, trabalhando em um restaurante 
italiano e se envolvendo com a prostituta Iria. A trama se desenrola em dois tempos, mostrando seu passado e seu presente na prisão, onde suas habilidades culinárias se tornam 
sua principal ferramenta de poder e sobrevivência.', 1000000, '01:53:00', 2007, 
'https://upload.wikimedia.org/wikipedia/pt/thumb/1/18/P%C3%B4ster_Est%C3%B4mago.jpg/250px-P%C3%B4ster_Est%C3%B4mago.jpg', 
'https://cosmoup.com.br/wp-content/uploads/2022/01/estomago-capa-do-filme.jpg'),

('Ponte para terabitia', 'Jess Aarons é um garoto de 12 anos de uma família pobre e numerosa, que se sente um estranho na escola e em casa. Sua vida muda com a chegada de 
Leslie Burke, uma nova aluna cheia de imaginação. Juntos, eles criam um reino mágico em uma floresta próxima chamado Terabítia, um lugar para escapar das dificuldades da vida 
real. Lá, eles se tornam rei e rainha, enfrentam criaturas fantásticas e constroem uma amizade profunda que transforma suas vidas para sempre.', 
20000000, '01:36:00', 2007, 
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1VQ0QCQFLfMjf0g1uIGcOWtr6RaDSA9wWNg&s', -- ajustado
'https://midias.imagemfilmes.com.br/fotos/1eeb1737-0b96-4734-a0e8-269dd04033e4_original.jpg?2019-06-17T15:54:41.330753'),

('O gato', 'Em um dia chuvoso, os irmãos Conrad e Sally Walden estão entediados em casa com sua mãe ausente. Sua rotina é quebrada pela visita inesperada de um gato 
antropomórfico, falante e de cartola, conhecido apenas como "O Gato". Ele promete diversão e aventura, mas seus jogos causam uma bagunça monumental. Com a ajuda da Coisa 1 
e da Coisa 2, o Gato transforma a casa em um caos, e as crianças precisam encontrar uma maneira de arrumar tudo antes que sua mãe volte.', 
109000000, '01:22:00', 2003, 'https://m.media-amazon.com/images/S/pv-target-images/ea34a4f3d3464d5a8c0694c8d46b80280f73d15db21e0e1342a4bffc53e07580.jpg', 
'https://m.media-amazon.com/images/M/MV5BMTI3MjE4MjE2M15BMl5BanBnXkFtZTcwOTMyNDczMw@@._V1_QL75_UX328_.jpg'),

('Rocky, Um lutador', 'Rocky Balboa é um boxeador de segunda categoria que vive na Filadélfia e ganha a vida como cobrador de dívidas para um agiota. 
Sua grande chance surge quando Apollo Creed, o campeão mundial dos pesos-pesados, precisa de um novo oponente para uma luta de exibição e escolhe o desconhecido 
"Garanhão Italiano". Com o apoio de seu treinador, Mickey Goldmill, e o amor de Adrian, Rocky treina incansavelmente para provar a si mesmo e ao mundo que ele pode ir até o 
fim contra o melhor.', 860000, '01:42:00', 1976, 
'https://m.media-amazon.com/images/M/MV5BNzdhZDNjN2ItMDdjMS00Yzk5LWFjZmYtMjM4MjM1Zjg2MzFlXkEyXkFqcGc@._V1_.jpg', -- ajustado
'https://t.ctcdn.com.br/mvGei3Ur-Bv2I0cXJ5g02cPv8bs=/60x207:924x694/640x360/smart/i390672.jpeg'),

('Eu Sou a Lenda', 'Robert Neville é um brilhante cientista e o único sobrevivente de uma praga que transformou a humanidade em mutantes sedentos por sangue. 
Por três anos, ele vaga pela cidade de Nova York devastada, enviando mensagens de rádio na esperança de encontrar outros sobreviventes. Durante o dia, ele caça e estuda os 
infectados, buscando uma cura em seu laboratório. À noite, ele se entrincheira em sua casa fortificada, lutando pela sobrevivência contra as criaturas que espreitam na 
escuridão.', 150000000, '01:41:00', 2007, 'https://m.media-amazon.com/images/S/pv-target-images/97bbb92890e9b6f91ae35a0c2cca26bed25b8b618dec7cbc6f216fb6534914af.jpg', -- ajustado
'https://rollingstone.com.br/wp-content/uploads/will_smith_em_eu_sou_a_lenda_foto_divulgacao.jpg'),

('Como Eu Era Antes de Você', 'Louisa "Lou" Clark é uma jovem alegre e peculiar que vive em uma pequena cidade inglesa. Desempregada, ela aceita um trabalho como cuidadora de 
Will Traynor, um jovem banqueiro rico que ficou tetraplégico após um acidente de moto. Will, amargo e deprimido, desistiu da vida. Lou, com seu otimismo contagiante, embarca 
em uma missão para mostrar a ele que a vida ainda vale a pena, e o relacionamento entre os dois transforma a vida de ambos de maneiras inesperadas.', 
20000000, '01:50:00', 2016, 'https://play-lh.googleusercontent.com/JQKfopRtWqyD1cUXjx4V00qLnKecgKlSTS6sL0YX1T0H4bzyOK8SxdQIUbZ6NTsKfkBm', -- ajustado, 
'https://irs.www.warnerbros.com.br/gallery-v2-mobile-jpeg/movies/media/ajax/fieldytvideos/und/form-t8mgiqixe15if5mldmgma9htqluex9phkrcx-6qezms/Me_Before_You_Photo9.jpg'),

('Crepúsculo', 'Isabella "Bella" Swan, uma adolescente de 17 anos, muda-se para a pequena e chuvosa cidade de Forks para morar com seu pai. Na nova escola, 
ela fica intrigada por Edward Cullen, um colega de classe misterioso e irresistivelmente belo. Bella logo descobre que Edward e sua família são vampiros. 
Apesar do perigo, eles se apaixonam profundamente, mas seu romance proibido atrai a atenção de outros vampiros, colocando a vida de Bella em risco.',
 37000000, '02:01:00', 2008, 'https://br.web.img2.acsta.net/medias/nmedia/18/87/02/32/19871201.jpg', -- ajustado 
 'https://cinepop.com.br/wp-content/uploads/2021/02/crepusculo_2.jpg'),
 
('Harry Potter e as Relíquias da Morte', 'Harry, Rony e Hermione abandonam Hogwarts para iniciar a perigosa missão de encontrar e destruir as Horcruxes, os fragmentos da alma 
de Lord Voldemort que garantem sua imortalidade. Sem a orientação de seus professores e a proteção de Dumbledore, o trio depende um do outro mais do que nunca. Enquanto isso, 
o mundo bruxo se torna um lugar perigoso para todos os inimigos do Lorde das Trevas.', 250000000, '02:10:00', 2011, 
'https://upload.wikimedia.org/wikipedia/pt/thumb/3/3a/Harry_Potter_and_the_Deathly_Hallows_-_Part_2.jpg/250px-Harry_Potter_and_the_Deathly_Hallows_-_Part_2.jpg', -- ajustado
'https://m.media-amazon.com/images/S/pv-target-images/b7c7c1a84913cada4d4f721f7d58a55abafe9041f9c3d4776fc56bcec0ffa494.jpg'),

('Carros 2', 'O astro das corridas Relâmpago McQueen e seu inseparável amigo, o guincho Mate, viajam para o Japão e a Europa para competir no primeiro Grand Prix Mundial. 
No entanto, a jornada se complica quando Mate é confundido com um espião americano. Ele se vê envolvido em uma trama de espionagem internacional ao lado dos agentes Finn 
McMissil e Holley Shiftwell, tentando salvar o mundo e, ao mesmo tempo, ajudar seu amigo a vencer a corrida.',
200000000, '01:53:00', 2011, 'https://m.media-amazon.com/images/M/MV5BMjcxZTUzNTktMzg5OC00MDdhLTg5NGQtMjExMzk4MmU1NjY0XkEyXkFqcGc@._V1_.jpg', -- ajustado
'https://cinemaemserie.com.br/wp-content/uploads/2011/06/carros-2-capa.jpg'),

('Midsommar', 'Dani Ardor, uma jovem traumatizada pela morte trágica de sua família, viaja com seu namorado Christian e seus amigos para uma remota comunidade na Suécia para 
participar de um festival de verão que ocorre a cada 90 anos. O que começa como um retiro idílico em um local ensolarado e pitoresco, lentamente se transforma em um pesadelo 
cada vez mais sinistro e perturbador, à medida que os moradores da vila revelam suas tradições pagãs e rituais violentos.',
 9000000, '02:28:00', 2019, 'https://m.media-amazon.com/images/M/MV5BODBhY2NlMjYtNGRlMS00NGE5LTljNGYtNmUxMDBhMmJkYjNiXkEyXkFqcGc@._V1_.jpg', -- ajustado
 'https://material.asset.catchplay.com/CEX-IN-001-A1062/artworks/posters/CEX-IN-001-A1062-P1200.jpg'),
 
('Donnie Darko', 'Donnie Darko é um adolescente inteligente, mas perturbado, que despreza seus colegas e familiares. Ele começa a ter visões de Frank, uma figura sinistra em 
uma fantasia de coelho, que o informa que o mundo acabará em 28 dias, 6 horas, 42 minutos e 12 segundos. Manipulado por Frank, Donnie comete uma série de crimes enquanto lida 
com questões complexas sobre destino, tempo e realidade, tentando desvendar o significado de suas visões apocalípticas.',
 4500000, '01:53:00', 2001, 'https://m.media-amazon.com/images/M/MV5BMWE3NTYzZmEtM2U5MS00MDZhLTk2ZTQtZTgzNjg0ZGQ5ZjM0XkEyXkFqcGc@._V1_.jpg', -- ajustado
 'https://ingresso-a.akamaihd.net/img/cinema/cartaz/9494-destaque.jpg'),
 
('Indiana Jones e os Caçadores da Arca Perdida', 'Em 1936, o governo dos Estados Unidos contrata o renomado arqueólogo e aventureiro Indiana Jones para encontrar a mística 
Arca da Aliança. Acredita-se que a Arca contém os Dez Mandamentos e concede um poder invencível a quem a possui. Jones precisa encontrá-la antes dos nazistas, que também 
estão em busca do artefato para ajudar Hitler a dominar o mundo. A busca o leva do Nepal ao Cairo, em uma corrida cheia de perigos e armadilhas mortais.', 
20000000, '01:55:00', 1981, 'https://m.media-amazon.com/images/I/81np4N8fPDL._AC_UF1000,1000_QL80_.jpg', -- ajustado
'https://aventurasnahistoria.com.br/wp-content/uploads/hard_news/indiana-jones-e-os-cacadores-da-arca-perdida.jpg'),

('De Volta para o Futuro', 'O adolescente Marty McFly é amigo do excêntrico cientista Emmett "Doc" Brown. Certa noite, Doc revela sua maior invenção: uma máquina do tempo 
construída em um carro DeLorean. Durante um ataque de terroristas, Marty é acidentalmente transportado para o ano de 1955. Lá, ele interfere no primeiro encontro de seus pais, 
Lorraine e George McFly, colocando em risco sua própria existência. Marty precisa unir seus pais e encontrar o Doc de 1955 para conseguir voltar para o futuro.', 
19000000, '01:56:00', 1985, 'https://ingresso-a.akamaihd.net/prd/img/movie/de-volta-para-o-futuro-relancamento/61061278-4ed2-43b5-976b-68e8ea67e338.webp', -- ajustado
'https://images.mubicdn.net/images/film/3362/cache-47563-1745490950/image-w1280.jpg?size=800x'),

('Réquiem para um Sonho', 'A trama acompanha a vida de quatro personagens em Coney Island, cujas vidas são consumidas pela dependência. Sara Goldfarb, uma viúva solitária, 
vicia-se em pílulas de emagrecimento para participar de seu programa de TV favorito. Seu filho Harry, sua namorada Marion e seu amigo Tyrone sonham em ficar ricos vendendo 
heroína, mas acabam se afundando no vício. O filme retrata a brutal e desesperadora jornada de cada um em busca de seus sonhos, que se transformam em um pesadelo.', 
4500000, '01:42:00', 2000, 'https://upload.wikimedia.org/wikipedia/pt/9/92/Requiem_for_a_dream.jpg', 
'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/f249/live/52ff9170-4556-11f0-82d5-89ce01115edf.jpg.webp'),

('À Espera de um Milagre', 'Em 1935, durante a Grande Depressão, Paul Edgecomb é o chefe de guarda do corredor da morte em uma prisão da Louisiana, conhecido como 
"A Milha Verde". Sua rotina e a de seus colegas é abalada pela chegada de John Coffey, um homem negro de estatura colossal, condenado pelo estupro e assassinato de duas 
meninas. Apesar de sua aparência intimidadora, Coffey demonstra uma natureza gentil e ingênua, além de possuir um dom sobrenatural e milagroso, que afeta a vida de todos ao 
seu redor.', 60000000, '03:09:00', 1999, 'https://upload.wikimedia.org/wikipedia/pt/8/8f/%C3%80_Espera_de_um_Milagre.jpg', -- ajustado
'https://aventurasnahistoria.com.br/wp-content/uploads/2024/04/a-espera-de-um-milagre.jpg');

-- Pais
INSERT INTO Pais(nome)
VALUES
('Coreia do Sul'),
('Estados Unidos'),
('Australia'),
('Japão'),
('Brasil');

-- Linguagem
INSERT INTO Linguagem(nome)
VALUES
('Ingles'),
('Coreano'),
('Japones'),
('Português');

-- Produtora
INSERT INTO Produtora(nome)
VALUES
('Egg Films'),
('Show East'),
('Paramount'),
('Happy Maddinson Productions'),
('Warner Animation Group'),
('A24'),
('Hakuhodo'),
('Paris Filmes'),
('Disney'),
('DreamWorks'),
('United Artists');

-- Genero
INSERT INTO Genero(nome)
VALUES
('Suspense'),
('Ação'),
('Neo-Noir'),
('Aventura'),
('Mistério'),
('Crime'),
('Faroeste'),
('Investigação'),
('Policial'),
('Comédia'),
('Besteirol'),
('Animação'),
('Ficção Científica'),
('Herói'),
('Horror'),
('Drama'),
('Adolescente'),
('Infantil');

-- Nacionalidade
INSERT INTO Nacionalidade(nome)
VALUES
('Coreano(a)'),
('Americano(a)'),
('Australiano(a)'),
('Japones(a)'),
('Brasileiro(a)'),
('Hungaro(a)'),
('Canadense');

INSERT INTO Diretor(nome, sobrenome, url_foto)
VALUES
('Park', 'Chan-Wook', 'https://images.mubicdn.net/images/cast_member/933/cache-30-1607464891/image-w856.jpg'),
('Ethan', 'Coen', 'https://i.discogs.com/HK8p8xfjimSxirht1_don_jF--DofEmnMwPyHNm7vjs/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTI3NDMy/Mi0xMTYxNDU5NjEy/LmpwZWc.jpeg'),
('Joel', 'Coen', 'https://sites.asiasociety.org/uschinaforum/wp-content/uploads/2011/10/coen-big.jpg'),
('Dennis','Dugan', 'https://images.squarespace-cdn.com/content/v1/615491594cac0b16401ee485/1632947892720-PJZP20P9YYU18AU57B6O/IMG_1605.jpg'),
('Chris','McKay', 'https://br.web.img3.acsta.net/c_310_420/pictures/23/04/20/21/46/2377658.jpg'),
('Michael','Philippou', 'https://image.tmdb.org/t/p/w500/zpkBlS9F4FGbNxaOQY2AuvL18Q8.jpg'),
('Danny','Philippou', 'https://www.justwatch.com/appassets/img/early-birds/authors/danny-phillippou.webp'),
('Kiyoshi','Kurosawa', 'https://images.mubicdn.net/images/cast_member/4778/cache-90078-1426139760/image-w856.jpg'),
('Marcos', 'Jorge', 'https://br.web.img3.acsta.net/c_310_420/img/42/21/4221743eb0d97d0e0668c7e6add2d013.PNG'),
('Gabor','Csupó', 'https://image.tmdb.org/t/p/w500/h78onamy0s7rDWtlbarRVGZqWF.jpg'),
('Bo', 'Welch', 'https://resizing.flixster.com/N3bxZKFZzqUgxuq3-fwwRFHt11Q=/fit-in/352x330/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/v9/AllPhotos/288132/288132_v9_bb.jpg'),
('Sylvester','Stallone', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Sylvester_Stallone.jpg/250px-Sylvester_Stallone.jpg'),
('Francis', 'Lawrence', 'https://image.tmdb.org/t/p/w500/pyGWo5mAwZ2Koe6leB2RjKd7vmc.jpg'),
('Thea', 'Sharrock', 'https://resizing.flixster.com/E_7ZMCrwz70-3l1SCQKnobG5pfQ=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/753947_v9_ba.jpg'),
('Catherine', 'Hardwicke', 'https://mediterrane.com/wp-content/uploads/2025/05/catherine-hard-1000x1060.jpg'),
('David', 'Yates', 'https://static.wikia.nocookie.net/harrypotter/images/3/3c/Dvytr.jpg/revision/latest/thumbnail/width/360/height/360?cb=20121029171052&path-prefix=pt-br'),
('John', 'Lasseter', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhTc7kXhdUNjTL2CVIJgNR4Hp45pSLOnTcBQ&s'),
('Ari', 'Aster', 'https://images.squarespace-cdn.com/content/v1/56c346b607eaa09d9189a870/1528310279691-GYUR8YL1XWGSZIRH8UKG/Shot_01_070_v2.jpg'),
('Richard', 'Kelly', 'httpsa://m.media-amazon.com/images/M/MV5BMTU4NzA3ODA2NV5BMl5BanBnXkFtZTcwNTk1ODcyMQ@@._V1_FMjpg_UX1000_.jpg'),
('Steven', 'Spielberg', 'https://images.mubicdn.net/images/cast_member/16878/cache-242-1602511014/image-w856.jpg'),
('Robert', 'Zemeckis', 'https://www.papodecinema.com.br/wp-content/uploads/2015/05/20180513-8151683702_cb109cf4ae_b.webp'),
('Darren', 'Aronofsky', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCIZx9OQGOZOJBpTKagVtION6AtXOZ1ixtKA&s'),
('Frank', 'Darabont', 'https://static.wikia.nocookie.net/stephenking/images/f/f4/Darabont.jpg/revision/latest/scale-to-width-down/284?cb=20170421040537');


INSERT INTO Ator(nome, sobrenome, url_foto)
VALUES
('Kang','Hye-jeong', 'https://m.media-amazon.com/images/M/MV5BOTgyMDY1MDE5M15BMl5BanBnXkFtZTcwNDI3MDExOA@@._V1_.jpg'),
('Choi', 'Min-sik', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHjSG-LQpeM6dC9XYNkFCEQTs3n0KkCVM0mw&s'),
('Yoo', 'Ji-tae', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIS8YD_rD5jtfEhUtE56RE2q2yipIRD29W7Q&s'),
('Javier','Barden', 'https://cdn.britannica.com/29/124329-050-A15813B2/Javier-Bardem-Spanish.jpg'),
('Tomy','Lee Jones', 'https://media.fstatic.com/l_vfCkrhDtGT0pcSc06BLm3hgrI=/210x312/smart/filters:format(webp)/media/artists/avatar/2013/07/tommy-lee-jones_a211.jpg'),
('Woody', 'Harrelson', 'https://br.web.img3.acsta.net/c_310_420/pictures/18/07/26/19/59/1559320.jpg'),
('Adam', 'Sandler', 'https://cdn.britannica.com/52/243652-050-FEE0A5E4/Actor-Adam-Sandler-2019.jpg'),
('Chris', 'Rock', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReY6wJ4PhYWyagYifckuUTU9PglvWj1mpuEQ&s'),
('Kevin', 'James', 'https://static.wikia.nocookie.net/sony-pictures-entertaiment/images/b/b6/Kevin_James.jpg/revision/latest?cb=20180908113356'),
('Will','Arnett', 'https://static.wikia.nocookie.net/garfield/images/0/08/WilllArnet.jpg/revision/latest?cb=20191225083100'),
('Chris','McKay', 'https://static.tvtropes.org/pmwiki/pub/images/oip_6_5.jpg'),
('Michael','Cera', 'https://www.onthisday.com/images/people/michael-cera.jpg?w=360'),
('Sally','Hawkins', 'https://br.web.img2.acsta.net/pictures/16/02/09/16/55/102827.jpg'),
('Billy','Barrat', 'https://ntvb.tmsimg.com/assets/assets/GNLZZGG0026FKSW.jpg'),
('Mischa', 'Heywood', 'https://resizing.flixster.com/oeIT93vilTVImZDvfMOt3_5tElM=/fit-in/352x330/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/GNLZZGG0026FKZ4.jpg'),
('Kato', 'Haruhiko', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr3YWQt9sSQHg7Ty5zLs98_8sU4swUI-n3Jg&s'),
('Koji', 'Yakusho', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfOhnrO7--vUx1h8T1QJyLuSzj80LWVwRJuw&s'),
('Jun', 'Fubuki', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAvgwCtPkMlV0iknvWl5X-g58YpyVMHlPgMw&s'),
('Fabíula','Nascimento', 'https://img.melhoresfilmes.com.br/unsafe/480x640/https%3A%2F%2Fwww.melhoresfilmes.com.br%2Fstorage%2Fimgs%2Factors%2F29445.jpg%3Ft%3D20220725221434'),
('João','Miguel', 'https://br.web.img2.acsta.net/c_310_420/pictures/14/12/09/20/34/386347.jpg'),
('Babu','Santana', 'https://atorbabusantana.files.wordpress.com/2015/01/babu-santana_20.jpg'),
('Josh','Hutcherson', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Josh_Hutcherson_J2premiere.jpg/250px-Josh_Hutcherson_J2premiere.jpg'),
('AnnaSophia', 'Robb', 'https://br.web.img3.acsta.net/pictures/19/09/24/02/30/0916074.jpg'),
('Zooey','Deschanel', 'https://br.web.img2.acsta.net/pictures/18/08/01/23/31/2505277.jpg'),
('Mike','Myers', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Mike_Myers.jpg/250px-Mike_Myers.jpg'),
('Alec', 'Baldwin', 'https://m.media-amazon.com/images/M/MV5BMjE1Njg4MzY3M15BMl5BanBnXkFtZTcwNTY3MjE3NA@@._V1_.jpg'),
('Kelly','Preston', 'https://www.televisionacademy.com/files/assets_r/containers/assets/bios/kelly-preston-450x600.jpg/e93e9bf3d16adce9f8e031e5922a02bf/kelly-preston-450x600.jpg'),
('Sylvester','Stallone', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Sylvester_Stallone.jpg/250px-Sylvester_Stallone.jpg'),
('Carl','Weathers', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Carl_Weathers_%28cropped_3_by_4%29.jpg/960px-Carl_Weathers_%28cropped_3_by_4%29.jpg'),
('Talia','Shire', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Talia_Shire_1977.jpg/960px-Talia_Shire_1977.jpg'),
('Will', 'Smith', 'https://www.papodecinema.com.br/wp-content/uploads/2014/09/20170925-will-smith-image2.webp'),
('Alice', 'Braga', 'https://br.web.img3.acsta.net/pictures/19/10/23/23/42/1960746.jpg'),
('Charlie', 'Tahan', 'https://m.media-amazon.com/images/M/MV5BZWU5N2MxYzEtM2VkNS00MGFhLWI0MTAtYTgxYjQ2MmU1NGIyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'),
('Emilia', 'Clarke', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSw1VGs840ijdCtjBCuFMJzjsbP2Ycri-tHg&s'),
('Sam', 'Claflin', 'https://i.pinimg.com/474x/50/84/21/508421c19fd7de77adca29bfa051a241.jpg'),
('Janet', 'McTeer', 'https://ntvb.tmsimg.com/assets/assets/79665_v9_bb.jpg'),
('Kristen', 'Stewart', 'https://br.web.img3.acsta.net/c_310_420/pictures/21/09/15/19/03/3453081.jpg'),
('Robert', 'Pattinson', 'https://www.papodecinema.com.br/wp-content/uploads/2017/05/20180514-robert-pattinson-esta-em-busca-de-estilo.webp'),
('Taylor', 'Lautner', 'https://ntvb.tmsimg.com/assets/assets/302376_v9_bc.jpg'),
('Daniel', 'Radcliffe', 'https://m.media-amazon.com/images/M/MV5BYzVmYjIxMzgtZWU2Ny00MjAyLTk5ZWUtZDEyMTliYjczMmIxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'),
('Emma', 'Watson', 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Emma_Watson_2013.jpg'),
('Rupert', 'Grint', 'https://hips.hearstapps.com/hmg-prod/images/rupert-grint-attends-red-carpet-of-dinard-film-festival-news-photo-1690831814.jpg?crop=0.668xw:1.00xh;0.167xw,0&resize=1200:*'),
('Owen', 'Wilson', 'https://cdn.britannica.com/68/220268-050-DE352796/Owen-Wilson-2017.jpg'),
('Larry', 'the Cable Guy', 'https://upload.wikimedia.org/wikipedia/commons/3/36/Larry_the_Cable_Guy.jpg'),
('Michael', 'Caine', 'https://image.tmdb.org/t/p/w500/bVZRMlpjTAO2pJK6v90buFgVbSW.jpg'),
('Florence', 'Pugh', 'https://m.media-amazon.com/images/M/MV5BZmIxMTFkZTctYzhkZi00MmQ4LThhYzEtMmQwMGZjNzA5MDg0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'),
('Jack', 'Reynor', 'https://ntvb.tmsimg.com/assets/assets/691513_v9_bc.jpg'),
('William', 'Jackson Harper', 'https://imgix.bustle.com/uploads/image/2022/8/8/f5ce304b-e410-42b9-b41b-699080c09bf0-onefunthing_williamjacksonharper.jpg?w=414&h=518&fit=crop&crop=focalpoint&dpr=2&fp-x=0.516&fp-y=0.3156'),
('Jake', 'Gyllenhaal', 'https://m.media-amazon.com/images/M/MV5BNjA0MTU2NDY3MF5BMl5BanBnXkFtZTgwNDU4ODkzMzE@._V1_FMjpg_UX1000_.jpg'),
('Jena', 'Malone', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Jena_Malone_Deauville.jpg/250px-Jena_Malone_Deauville.jpg'),
('Maggie', 'Gyllenhaal', 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Maggie_Gyllenhaal_Berlinale_2017.jpg'),
('Harrison', 'Ford', 'https://www.papodecinema.com.br/wp-content/uploads/2014/07/20170712-111111170505-oney-harrison-ford-tease_fjr4na-copy.webp'),
('Karen', 'Allen', 'https://media.fstatic.com/6bwcCBRmiu5x0wWu5XP_npZpas0=/full-fit-in/290x478/filters:format(webp)/media/artists/avatar/2019/05/karen-allen_a17802_R6i7Kpo.jpg'),
('Paul', 'Freeman', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfiAEi6viM-WjhMv1mPocLzGPi8_H6nOtx9Q&s'),
('Michael', 'J. Fox', 'https://cdn.britannica.com/33/130633-050-DA6DF1CF/Michael-J-Fox-activist.jpg'),
('Christopher', 'Lloyd', 'https://m.media-amazon.com/images/M/MV5BMjAzMDAxNTQ1M15BMl5BanBnXkFtZTcwMzI0MTg2OA@@._V1_FMjpg_UX1000_.jpg'),
('Lea', 'Thompson', 'https://m.media-amazon.com/images/M/MV5BNTgwNDE2MTY2MV5BMl5BanBnXkFtZTgwMzQxMDc2MjI@._V1_FMjpg_UX1000_.jpg'),
('Jared', 'Leto', 'https://images.mubicdn.net/images/cast_member/2837/cache-598017-1650271975/image-w856.jpg'),
('Jennifer', 'Connelly', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWelRnG3NzLFb0agHZOVa5n1KciRCPfKfHjw&s'),
('Ellen', 'Burstyn', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXobvAMZM9R59HHp5nTryD4qB8MCNuyVTDVQ&s'),
('Tom', 'Hanks', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjchiiz_M-Ftuo_N2IjNvlqjbf2Zhb1IoT6w&s'),
('Michael', 'Clarke Duncan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/MClarkeDuncan021109-R106_%2850094589037%29.jpg/250px-MClarkeDuncan021109-R106_%2850094589037%29.jpg'),
('David', 'Morse', 'https://cdn11.bigcommerce.com/s-yzgoj/images/stencil/1280x1280/products/1897358/4071472/apilwaddo__03186.1626620432.jpg?c=2');

INSERT INTO Ator_Nacionalidade (id_ator, id_nacionalidade) VALUES
(1,1),(2,1),(3,1),
(4,2),(5,2),(6,2),
(7,2),(8,2),(9,2),
(10,2),(11,2),(12,2),
(13,2),(14,2),(15,5),
(16,4),(17,4),(18,4),
(19,5),(20,5),(21,5),
(22,2),(23,2),(24,2),
(25,2),(26,2),(27,2),
(28,2),(29,2),(30,2),
(31,2),(32,5),(33,2),
(34,5),(35,2),(36,2),
(37,2),(38,2),(39,2),(40,2),
(41,2),(42,2),(43,2),
(44,2),(45,2),(46,2),
(47,2),(48,2),(49,2),
(50,2),(51,2),(52,2),
(53,2),(54,2),(55,2),
(56,2),(57,2),(58,2),(59,2);


INSERT INTO Diretor_Nacionalidade (id_diretor, id_nacionalidade) VALUES
(1,1),(2,2),(3,2),(4,2),(5,2),(6,2),(7,2),(8,4),(9,5),(10,6),
(11,2),(12,2),(13,2),(14,5),(15,5),(16,2),(17,2),(18,2),(19,2),(20,2),(21,2),(22,5);


INSERT INTO Filme_Genero (id_filme, id_genero) VALUES
(1,3),(2,2),(3,11),(4,13),(5,2),(6,14),(7,17),(8,18),(9,15),(10,11),
(11,14),(12,17),(13,18),(14,14),(15,13),(16,16),(17,3),(18,5),(19,5),(20,17);

-- Filme_Diretor (Copiado do seu script)
INSERT INTO Filme_Diretor (id_filme, id_diretor) VALUES
(1,1),(2,2),(3,4),(4,5),(5,6),(6,8),(7,9),(8,3),(9,11),(10,12),
(11,13),(12,14),(13,15),(14,16),(15,17),(16,18),(17,19),(18,20),(19,21),(20,22);


INSERT INTO Filme_Ator (id_filme, id_ator) VALUES
(1,1),(1,2),(1,3),
(2,4),(2,5),(2,6),
(3,7),(3,8),(3,9),
(4,10),(4,11),(4,12),
(5,19),(5,20),(5,31),
(6,16),(6,17),(6,18),
(7,20),(7,19),(7,18), 
(8,23),(8,24),(8,21),
(9,25),(9,26),(9,27),
(10,28),(10,29),(10,30),
(11,31),(11,32),(11,1),
(12,33),(12,34),(12,35),
(13,36),(13,37),(13,38),
(14,39),(14,40),(14,41),
(15,42),(15,43),(15,44),
(16,45),(16,46),(16,47),
(17,48),(17,49),(17,50),
(18,51),(18,52),(18,53),
(19,54),(19,55),(19,56),
(20,57),(20,58),(20,59);


INSERT INTO Filme_Pais (id_filme, id_pais) VALUES
(1,1),(2,2),(3,2),(4,2),(5,2),(6,4),(7,5),(8,2),(9,2),(10,2),
(11,2),(12,5),(13,2),(14,2),(15,2),(16,2),(17,2),(18,2),(19,2),(20,2);


INSERT INTO Filme_Linguagem (id_filme, id_linguagem) VALUES
(1,2),(2,1),(3,1),(4,1),(5,1),(6,3),(7,4),(8,1),(9,1),(10,1),
(11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1),(18,1),(19,1),(20,1);

INSERT INTO Filme_Produtora (id_filme, id_produtora) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 5),
(5, 2),
(6, 4),
(7, 8),
(8, 1),
(9, 2),
(10, 9),
(11, 5),
(12, 6),
(13, 9),
(14, 10),
(15, 3),
(16, 6),
(17, 4),
(18, 3),
(19, 10),
(20, 11);


INSERT INTO Usuario (nome, sobrenome, email, password_hash, role)
VALUES
('Mariany', 'Lima', 'mariany@filminis.com', '$2b$12$SQMw8HSTBnaYcuIDLnJgUOvmiFepJBhOhsm0rR9STTNXK0IN5dKzG', 'ADMIN'),
('Alex', 'Pinheiro', 'alexlp2k6@gmail.com', '$2b$12$SQMw8HSTBnaYcuIDLnJgUOvmiFepJBhOhsm0rR9STTNXK0IN5dKzG', 'USER');

select * from filme;