% Pisos de cada edifício
% pisos(Edifício, [Piso1, Piso2, ...])
pisos(a, [a1, a2]).
pisos(b, [b1, b2, b3]).
pisos(c, [c1, c2, c3, c4]).
pisos(d, [d1, d2, d3]).


% Pisos servidos por um elevador especifico em cada edifício
% elevador(edifício, [Piso1, Piso2, ...])
elevador(a, [a1, a2]).
elevador(b, [b1, b2, b3]).
elevador(c, [c1, c2, c3, c4]).
elevador(d, [d1, d2, d3]).

% Corredores de passagem entre pisos de dois edifício
% corredor(edifício1, edifício2, piso1, piso2).
corredor(a, b, a2, b2).
corredor(b, c, b3, c4).
corredor(b, c, b2, c3).
corredor(b, c, b2, d3).
corredor(c, d, c2, d2).
corredor(c, d, c3, d3).


% Defenições das ligações entre edifício
% liga(edifício1, edifício2).
liga(a, b).
liga(b, c).
liga(b, d).
liga(c, d).





% Celulas do mapa de cada piso
% m(coluna, linha, valor, edifício).
% se o valor for 0, a celula é transitável

%a1
m(1,1,0,a1).
m(2,1,0,a1).
m(3,1,0,a1).
m(4,1,0,a1).
m(5,1,0,a1).


m(1,2,0,a1).
m(2,2,0,a1).
m(3,2,0,a1).
m(4,2,0,a1).
m(5,2,0,a1).

%a2
m(1,1,0,a2).
m(2,1,0,a2).
m(3,1,0,a2).
m(4,1,0,a2).
m(5,1,0,a2).


m(1,2,0,a2).
m(2,2,0,a2).
m(3,2,0,a2).
m(4,2,0,a2).
m(5,2,0,a2).

%b1
m(1,1,0,b1).
m(2,1,0,b1).
m(3,1,0,b1).
m(4,1,0,b1).
m(5,1,0,b1).


m(1,2,0,b1).
m(2,2,0,b1).
m(3,2,0,b1).
m(4,2,0,b1).
m(5,2,0,b1).

%b2
m(1,1,0,b2).
m(2,1,0,b2).
m(3,1,0,b2).
m(4,1,0,b2).
m(5,1,0,b2).

m(1,2,0,b2).
m(2,2,0,b2).
m(3,2,0,b2).
m(4,2,0,b2).
m(5,2,0,b2).

%b3
m(1,1,0,b3).
m(2,1,0,b3).
m(3,1,0,b3).
m(4,1,0,b3).
m(5,1,0,b3).

m(1,2,0,b3).
m(2,2,0,b3).
m(3,2,0,b3).
m(4,2,0,b3).
m(5,2,0,b3).

%c1
m(1,1,0,c1).
m(2,1,0,c1).
m(3,1,0,c1).
m(4,1,0,c1).
m(5,1,0,c1).


m(1,2,0,c1).
m(2,2,0,c1).
m(3,2,0,c1).
m(4,2,0,c1).
m(5,2,0,c1).

%c2
m(1,1,0,c2).
m(2,1,0,c2).
m(3,1,0,c2).
m(4,1,0,c2).
m(5,1,0,c2).


m(1,2,0,c2).
m(2,2,0,c2).
m(3,2,0,c2).
m(4,2,0,c2).
m(5,2,0,c2).

%c3
m(1,1,0,c3).
m(2,1,0,c3).
m(3,1,0,c3).
m(4,1,0,c3).
m(5,1,0,c3).


m(1,2,0,c3).
m(2,2,0,c3).
m(3,2,0,c3).
m(4,2,0,c3).
m(5,2,0,c3).

%c4
m(1,1,0,c4).
m(2,1,0,c4).
m(3,1,0,c4).
m(4,1,0,c4).
m(5,1,0,c4).

m(1,2,0,c4).
m(2,2,0,c4).
m(3,2,0,c4).
m(4,2,0,c4).
m(5,2,0,c4).

%d1
m(1,1,0,d1).
m(2,1,0,d1).
m(3,1,0,d1).
m(4,1,0,d1).
m(5,1,0,d1).

m(1,2,0,d1).
m(2,2,0,d1).
m(3,2,0,d1).
m(4,2,0,d1).
m(5,2,0,d1).

%d2
m(1,1,0,d2).
m(2,1,0,d2).
m(3,1,0,d2).
m(4,1,0,d2).
m(5,1,0,d2).

m(1,2,0,d2).
m(2,2,0,d2).
m(3,2,0,d2).
m(4,2,0,d2).
m(5,2,0,d2).

%d3 
m(1,1,0,d3).
m(2,1,0,d3).
m(3,1,0,d3).
m(4,1,0,d3).
m(5,1,0,d3).
 
m(1,2,0,d3).
m(2,2,0,d3).
m(3,2,0,d3).
m(4,2,0,d3).
m(5,2,0,d3).





:- dynamic ligacel/4.

cria_grafos():-
    cria_grafo(5,2,a1),
    cria_grafo(5,2,a2),
    cria_grafo(5,2,b1),
    cria_grafo(5,2,b2),
    cria_grafo(5,2,b3),
    cria_grafo(5,2,c1),
    cria_grafo(5,2,c2),
    cria_grafo(5,2,c3),
    cria_grafo(5,2,c4),
    cria_grafo(5,2,d1),
    cria_grafo(5,2,d2),
    cria_grafo(5,2,d3).

   



cria_grafo(_,0,_):-!.
cria_grafo(Col,Lin,P):-cria_grafo_lin(Col,Lin,P),Lin1 is Lin-1,cria_grafo(Col,Lin1,P).


cria_grafo_lin(0,_,_):-!.
cria_grafo_lin(Col,Lin,P):-
m(Col,Lin,0,P),!,ColS is Col+1, ColA is Col-1, LinS is Lin+1,LinA is Lin-1,
    ((m(ColS,Lin,0,P),assertz(ligacel(cel(Col,Lin),cel(ColS,Lin),P,1));true)),
    ((m(ColA,Lin,0,P),assertz(ligacel(cel(Col,Lin),cel(ColA,Lin),P,1));true)),
    ((m(Col,LinS,0,P),assertz(ligacel(cel(Col,Lin),cel(Col,LinS),P,1));true)),
    ((m(Col,LinA,0,P),assertz(ligacel(cel(Col,Lin),cel(Col,LinA),P,1));true)),
    ((m(ColS,LinS,0,P),m(Col,LinS,0,P),m(ColS,Lin,0,P),assertz(ligacel(cel(Col,Lin),cel(ColS,LinS),P,sqrt(2)));true)),
    ((m(ColS,LinA,0,P),m(ColS,Lin,0,P),m(Col,LinA,0,P),assertz(ligacel(cel(Col,Lin),cel(ColS,LinA),P,sqrt(2)));true)),
    ((m(ColA,LinA,0,P),m(Col,LinA,0,P),m(ColA,Lin,0,P),assertz(ligacel(cel(Col,Lin),cel(ColA,LinA),P,sqrt(2)));true)),
    ((m(ColA,LinS,0,P),m(ColA,Lin,0,P),m(Col,LinS,0,P),assertz(ligacel(cel(Col,Lin),cel(ColA,LinS),P,sqrt(2)));true)),
    Col1 is Col-1,
    cria_grafo_lin(Col1,Lin,P).
cria_grafo_lin(Col,Lin,P):-Col1 is Col-1,cria_grafo_lin(Col1,Lin,P).
