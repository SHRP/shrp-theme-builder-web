from pathlib import Path
x = Path('').glob('*.png')

for item in x:
    print(f'"{item.__str__()}",')