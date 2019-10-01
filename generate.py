import time
from itertools import zip_longest
from pathlib import Path

import toml
from jinja2 import Environment, FileSystemLoader


def generate(data, template: Path, output: Path):
    env = Environment(
        loader=FileSystemLoader(searchpath=[
            str(Path(__file__).parent.resolve()),
        ])
    )
    env.filters['is_list'] = lambda x: isinstance(x, list)
    env.filters['in_chunks'] = grouper
    env.filters['or'] = or_default

    with open(output, 'w') as f:
        f.write(env.get_template(template.name).render(
            contests=data['contests'],
            keynotes=data['keynotes'],
            schedule=data['schedule'],
            speakers=data['speakers'],
            subscribe=data['subscribe'],
            workshops=data['workshops'],
        ))


def grouper(iterable, size, fillvalue=None):
    '''
    (From itertools#recipes)
    Collect data into fixed-length chunks or blocks.
    Example: grouper('ABCDEFG', 3, 'x') --> ABC DEF Gxx"
    '''
    args = [iter(iterable)] * size
    return zip_longest(*args, fillvalue=fillvalue)


def or_default(value, default):
    return value if value else default


def main():
    with open(Path('data.toml')) as f:
        generate(
            data=toml.load(f),
            template=Path('index_template.html'),
            output=Path('index.html')
        )

        print(f'Done. {time.strftime("%d/%m/%y %H:%M")}')


if __name__ == '__main__':
    main()
