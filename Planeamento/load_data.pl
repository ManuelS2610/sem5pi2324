- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_open)).
:- use_module(library(http/json)).
:- use_module(library(http/http_cors)).
:- use_module(library(settings)).
:- use_module(library(http/http_parameters)).
:- dynamic corredor/4.
:- dynamic liga/2.
:- dynamic elevador/2.
:- dynamic pisos/2.
:- dynamic building/1.

floors_building_url("http://localhost:4000/api/floors/").

get_floors_building(X, Res) :-
    string_concat('http://localhost:4000/api/floors/', X, URL),
    http_open(URL, In, []),
    json_read_dict(In, JSON),
    close(In),
    parse_floors(JSON,Res),
    assertz(pisos(X,Res)),
    write(pisos(X,Res)).


parse_corredor([],[]).
parse_corredor([H|T],[H.building1,H.building2|R]):-
    assertz(corredor(H.building1,H.building2,H.pisobuilding1,H.pisobuilding2)),
    assertz(liga(H.building1,H.building2)),
    write(corredor(H.building1,H.building2,H.pisobuilding1,H.pisobuilding2)),
    write(liga(H.building1,H.building2)),
    parse_corredor(T,R).

parse_elevador([],[]).
parse_elevador([H|T],[H.buildingName,H.floors|R]):-
    assertz(elevador(H.buildingName,H.floors)),
    write(elevador(H.buildingName,H.floors)),
    parse_elevador(T,R).

parse_building([],[]).
parse_building([H|T],[H.name|R]):-
    get_floors_building(H.name,Res),
        parse_building(T,R).



parse_floors([],[]).
parse_floors([H|T],[H.name|R]):-
     parse_floors(T,R).


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
    findall(LLig,caminho_pisos(PisoOr,PisoDest,_,LLig),LLLig),
    menos_elevadores(LLLig,LLigMelhor,_,_).

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