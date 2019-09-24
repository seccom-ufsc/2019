from pathlib import Path
from pprint import pformat

import toml
from jinja2 import Environment, FileSystemLoader


def generate(data, template: Path, output: Path):
    env = Environment(
        loader=FileSystemLoader(searchpath=[str(Path(__file__).parent.resolve())])
    )

    template = env.get_template(template.name)

    with open(output, 'w') as f:
        f.write(template.render(schedule=data['schedule']))


def main():
    with open(Path('data.toml')) as f:
        generate(
            data=toml.load(f),
            template=Path('index_template.html'),
            output=Path('index.html')
        )


if __name__ == '__main__':
    main()
