% Pisos de cada edif�cio
pisos("a", ["a1", "a2"]).
pisos("b", ["b1", "b2", "b3"]).
pisos(c, [c1, c2, c3, c4]).
pisos(d, [d1, d2, d3]).

% Pisos servidos por um elevador espec�fico em cada edif�cio
elevador("a", ["a1", "a2"]).
elevador("b", ["b1", "b2", "b3"]).
elevador(c, [c1, c2, c3, c4]).
elevador(d, [d1, d2, d3]).

% Corredores de passagem entre pisos de dois edif�cios
corredor("a", "b", "a2", "b2").
corredor(b, c, b3, c4).
corredor(b, c, b2, c3).
corredor(b, c, b2, d3).
corredor(c, d, c2, d2).
corredor(c, d, c3, d3).


% Defini��o das liga��es entre edif�cios
liga("a", "b").
liga(b, c).
liga(b, d).
liga(c, d).


:- dynamic ligacel/4.

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


m(1,3,1,c3).
m(2,3,1,c3).
m(3,3,0,c3).
m(4,3,1,c3).
m(5,3,1,c3).


m(1,4,1,c3).
m(2,4,1,c3).
m(3,4,0,c3).
m(4,4,1,c3).
m(5,4,1,c3).



m(1,5,0,c3).
m(2,5,0,c3).
m(3,5,0,c3).
m(4,5,0,c3).
m(5,5,0,c3).






caminho_edificios(EdOr,EdDest,LEdCam):-
    caminho_edificios2(EdOr,EdDest,[EdOr],LEdCam).

caminho_edificios2(EdX,EdX,LEdInv,LEdCam):-!,reverse(LEdInv,LEdCam).

caminho_edificios2(EdAct,EdDest,LEdPassou,LEdCam):-
    (liga(EdAct,EdInt);liga(EdInt,EdAct)),
    \+member(EdInt,LEdPassou),
    caminho_edificios2(EdInt,EdDest,[EdInt|LEdPassou],LEdCam).

caminho_pisos(PisoOr,PisoDest,LEdCam,LLig):-
    pisos(EdOr,LPisosOr),member(PisoOr,LPisosOr),pisos(EdDest,LPisosDest),member(PisoDest,LPisosDest),
    caminho_edificios(EdOr,EdDest,LEdCam),
    segue_pisos(PisoOr,PisoDest,LEdCam,LLig).

segue_pisos(PisoDest,PisoDest,_,[]).

segue_pisos(PisoDest1,PisoDest,[EdDest],[elev(PisoDest1,PisoDest)]):-
    PisoDest\==PisoDest1,
    elevador(EdDest,LPisos), member(PisoDest1,LPisos), member(PisoDest,LPisos).

segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[cor(PisoAct,PisoSeg)|LOutrasLig]):-
    (corredor(EdAct,EdSeg,PisoAct,PisoSeg);corredor(EdSeg,EdAct,PisoSeg,PisoAct)),
    segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig).

segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[elev(PisoAct,PisoAct1),cor(PisoAct1,PisoSeg)|LOutrasLig]):-
    (corredor(EdAct,EdSeg,PisoAct1,PisoSeg);corredor(EdSeg,EdAct,PisoSeg,PisoAct1)),
    PisoAct1\==PisoAct,
    elevador(EdAct,LPisos),member(PisoAct,LPisos),member(PisoAct1,LPisos),
    segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig).

melhor_caminho_pisos(PisoOr,PisoDest,LLigMelhor):-
    findall(LLig,caminho_pisos(PisoOr,PisoDest,_,LLig),LLLig),menos_elevadores(LLLig,LLigMelhor,_,_).

menos_elevadores([LLig],LLig,NElev,NCor):-
    conta(LLig,NElev,NCor).

menos_elevadores([LLig|OutrosLLig],LLigR,NElevR,NCorR):-
    menos_elevadores(OutrosLLig,LLigM,NElev,NCor),
    conta(LLig,NElev1,NCor1),
    (((NElev1<NElev;(NElev1==NElev,NCor1<NCor)),!,
      NElevR is NElev1, NCorR is NCor1,LLigR=LLig);
    (NElevR is NElev,NCorR is NCor,LLigR=LLigM)).

conta([],0,0).

conta([elev(_,_)|L],NElev,NCor):-
    conta(L,NElevL,NCor),NElev is NElevL+1.

conta([cor(_,_)|L],NElev,NCor):-
    conta(L,NElev,NCorL),NCor is NCorL+1.






cria_grafos():-
    cria_grafo(5,5,c3).



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

%--- Depth First Search ---%

dfs(CelulaOrigem, CelulaDestino, Piso, Caminho):-
    dfs(CelulaOrigem, CelulaDestino, Piso, [CelulaOrigem], Caminho).

dfs(CelulaOrigem, CelulaDestino, Piso, Visitados, Caminho):-
    ligacel(CelulaOrigem, CelulaDestino, Piso,_),
    reverse([CelulaDestino|Visitados], Caminho).

dfs(CelulaOrigem, CelulaDestino, Piso, Visitados, Caminho):-
    ligacel(CelulaOrigem, CelulaIntermediaria, Piso,_),
    \+ member(CelulaIntermediaria, Visitados),
    dfs(CelulaIntermediaria, CelulaDestino, Piso, [CelulaIntermediaria|Visitados], Caminho).

all_dfs(CelulaOrigem, CelulaDestino, Piso, Caminhos):-
    findall(Caminho, dfs(CelulaOrigem, CelulaDestino, Piso, Caminho), Caminhos).


better_dfs(CelulaOrigem, CelulaDestino, Piso, Caminho):-
    all_dfs(CelulaOrigem, CelulaDestino, Piso, Caminhos),
    melhor_caminho(Caminhos, Caminho).

melhor_caminho([Caminho], Caminho):- !.

melhor_caminho([Caminho1, Caminho2|Caminhos], MelhorCaminho):-
    length(Caminho1, Tamanho1),
    length(Caminho2, Tamanho2),
    Tamanho1 =< Tamanho2,
    melhor_caminho([Caminho1|Caminhos], MelhorCaminho).

melhor_caminho([Caminho1, Caminho2|Caminhos], MelhorCaminho):-
    length(Caminho1, Tamanho1),
    length(Caminho2, Tamanho2),
    Tamanho1 > Tamanho2,
    melhor_caminho([Caminho2|Caminhos], MelhorCaminho).


%--- Breadth First Search ---%

bfs(CelulaOrigem, CelulaDestino, Piso, Caminho):-
    bfs2(CelulaDestino,[[CelulaOrigem]],Piso,Caminho).

bfs2(CelulaDestino,[[CelulaDestino|T]|_],_,Caminho):-
reverse([CelulaDestino|T],Caminho).


bfs2(CelulaDestino,[[CelulaOrigem|T]|Fila],Piso,Caminho):-
    findall([CelulaIntermediaria,CelulaOrigem|T],
    (ligacel(CelulaOrigem,CelulaIntermediaria,Piso,_),\+ member(CelulaIntermediaria,[CelulaOrigem|T])),
    Lista),
    append(Fila,Lista,Fila2),
    bfs2(CelulaDestino,Fila2,Piso,Caminho).

%--- A* ---%

aStar(Orig,Dest,Cam,Custo,P):-
aStar2(Dest,[(_,0,[Orig])],Cam,Custo,P).

aStar2(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo,_):-
reverse([Dest|T],Cam).

aStar2(Dest,[(_,Ca,LA)|Outros],Cam,Custo,P):-
LA=[Act|_],
findall((CEX,CaX,[X|LA]),
    (Dest\==Act,ligacel(Act,X,P,CustoX),\+ member(X,LA),
    CaX is CustoX + Ca,estimativa(X,Dest,EstX),
    CEX is CaX + EstX),Novos),
append(Outros,Novos,Todos),
sort(Todos,TodosOrd),
aStar2(Dest,TodosOrd,Cam,Custo,P).

estimativa(cel(X1,Y1),cel(X2,Y2),Estimativa):-
Estimativa is sqrt((X1-X2)^2 + (Y1-Y2)^2).

