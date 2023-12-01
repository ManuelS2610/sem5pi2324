:- dynamic ligacel/4.

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



%--- Depth First Search Melhorado ---%
better_dfs(CelulaOrigem, CelulaDestino, Piso, Caminho):-
get_time(Ti),

    all_dfs(CelulaOrigem, CelulaDestino, Piso, Caminhos),
    melhor_caminho(Caminhos, Caminho),
    get_time(Tf),
Tempo is Tf-Ti,
write('Tempo: '),write(Tempo),nl.

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

all_dfs(CelulaOrigem, CelulaDestino, Piso, Caminhos):-
    findall(Caminho, dfs(CelulaOrigem, CelulaDestino, Piso, Caminho), Caminhos).


%--- Breadth First Search ---%

bfs(CelulaOrigem, CelulaDestino, Piso, Caminho):-
get_time(Ti),
    bfs2(CelulaDestino,[[CelulaOrigem]],Piso,Caminho),
get_time(Tf),
Tempo is Tf-Ti,
write('Tempo: '),write(Tempo),nl.

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