:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_open)).
:- use_module(library(http/json)).
:- use_module(library(http/http_cors)).
:- use_module(library(settings)).
:- use_module(library(http/http_parameters)).

:- set_setting(http:cors,[*]).

% Consult your knowledge base
:- consult('load_data').

% Define the main API handler

% Start the server
startServer(Port) :-
    http_server(http_dispatch, [port(Port)]).

% Stop the server
stopServer(Port) :-
    http_stop_server(Port, []).

% Define the URL for fetching buildings
buildings_url("http://localhost:4000/api/buildings/").

% Handle HTTP GET request for buildings
get_building(Res) :-
    buildings_url(URL),
    http_open(URL, In, []),
    json_read_dict(In, JSON),
    close(In),
    parse_building(JSON,Res).

robots_url("http://localhost:4000/api/robots").

get_robots():-
    robots_url(URL),
    http_open(URL, In, []),
    json_read(In, JSON),
    close(In),
    json_to_prolog(JSON, Res),
    reply_json(Res).


passages_url("http://localhost:4000/api/passage/all").

get_passage(Res):-
    passages_url(URL),
    http_open(URL,In,[]),
    json_read_dict(In,JSON),
    close(In),
    parse_corredor(JSON,Res).


elevators_url("http://localhost:4000/api/elevators").

get_elevators(Res):-
    elevators_url(URL),
    http_open(URL,In,[]),
    json_read_dict(In,JSON),
    close(In),
    parse_elevador(JSON,Res).



:- http_handler('/api/bestPath', getPath, []).


getPath(Request):-
    cors_enable(Request,[ methods([get,options])]),
    http_parameters(Request, [piso1(Px, [string]), piso2(Py, [string])]),
    melhor_caminho_pisos(Px, Py,Cam),
    format('Content-type: application/json~n~n'),
    format('{"result": "~w"}', [Cam]).

:-
    get_building(Res).
:-
    get_elevators(Res).
:-
    get_passage(Res).
