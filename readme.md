SECCOM 2019
===========

Build
-----

Antes da primeira build:

```console
$ poetry shell
$ poetry install
```

Então, sempre que precisars gerar o `index.html` novamente:

```console
$ python -m generate
```

Por fim, para hostear localmente (localhost:8080):

```console
$ python -m http.server
```

Alterar dados
-------------

Todos os dados estão descritos no arquivo [data.toml](data.toml).
