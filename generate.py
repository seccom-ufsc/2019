import time
from itertools import zip_longest
from pathlib import Path

import toml
from jinja2 import Environment, FileSystemLoader
from htmlmin import minify


def make_button(button, active_text, inactive_text) -> str:
    active = button['active']
    icon = '&nbsp;<i class="fa fa-pencil"></i>'

    text = f'{active_text}{icon}' if active else inactive_text
    button_class = ' '.join([
        'btn',
        'btn-outline-dark',
        'active' if active else 'disabled',
    ])

    fields = {
        'id': button['id'] if 'id' in button else None,
        'href': button['url'] if 'url' in button else None,
        'class': button_class,
        'aria-disabled': None if active else 'true',
    }

    return ''.join([
        '<a ',
        ' '.join(
            f'{field}="{value}"'
            for field, value in fields.items()
            if value is not None
        ),
        f'>{text}</a>',
    ])


def generate(data, template: Path, output: Path):
    env = Environment(
        loader=FileSystemLoader(searchpath=[
            str(Path(__file__).parent.resolve()),
        ])
    )
    env.filters['is_list'] = lambda x: isinstance(x, list)
    env.filters['in_chunks'] = grouper
    env.filters['or'] = or_default
    env.filters['make_button'] = make_button

    with open(output, 'w') as f:
        html = env.get_template(template.name).render(
            contests=data['contests'],
            keynotes=data['keynotes'],
            schedule=data['schedule'],
            sections=data['sections'],
            speakers=data['speakers'],
            subscribe=data['subscribe'],
            workshops=data['workshops'],
        )
        minified = minify(html, remove_comments=True, remove_empty_space=True)
        f.write(minified)


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
