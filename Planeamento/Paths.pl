:- dynamic caminho_edificios/3.
:- dynamic caminho_edificios2/4.
:- dynamic segue_pisos/4.
:- dynamic pisos/2.
:- dynamic liga/2.

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

%--- Melhor caminho ---%
melhor_caminho_pisos(PisoOr,PisoDest,LLigMelhor):-
    findall(LLig,caminho_pisos(PisoOr,PisoDest,_,LLig),LLLig),
    menos_elevadores(LLLig,LLigMelhor,_,_).

melhor_caminho_pisos_melhorado(PisoOr,PisoDest,LLigMelhor):-
    findall(LLig,caminho_pisos(PisoOr,PisoDest,_,LLig),LLLig),
    menos_elevadores(LLLig,LLigMelhor,_,_),
    reverse(LLigMelhor,LLigMelhorInv),
    formatar_lista(LLigMelhorInv, Cam),
    write(Cam).
    

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

% Predicado para extrair os pisos de cada elemento da lista LLigMelhor
extrair_pisos([], []).

% Quando o elemento é um elevador, extrai o piso e adiciona à lista Cam
extrair_pisos([elev(Piso, _) | Resto], [Piso | Cam]) :-
    extrair_pisos(Resto, Cam),
    write("------------------------------------------------------------------------"), nl,
    write("Piso: "), write(Piso), nl,
    aStar(cel(1,1), cel(5,2), CamAstar, Custo, Piso),
     write("CaminhoPiso: "), write(CamAstar), nl,
    write("Custo: "), write(Custo), nl,
  write("------------------------------------------------------------------------"), nl.

   
extrair_pisos([cor(Piso, _) | Resto], [Piso | Cam]) :-
    extrair_pisos(Resto, Cam),
    write("------------------------------------------------------------------------"), nl,
  write("Piso: "), write(Piso), nl,
    aStar(cel(1,1), cel(3,1), CamAstar, Custo, Piso),
    write("CaminhoPiso: "), write(CamAstar), nl,
    write("Custo: "), write(Custo), nl,
    write("------------------------------------------------------------------------"), nl.


   

% Predicado para formatar LLigMelhor no formato desejado (Cam)
formatar_lista([], []).
formatar_lista(LLigMelhor, Cam) :-
    extrair_pisos(LLigMelhor, Cam).
