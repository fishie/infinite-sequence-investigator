from glob import glob
from subprocess import run
from functools import reduce

test_files = glob('**/*.tests.js', recursive=True)
results = []
for test_file in test_files:
    result = run(['node', '--experimental-modules', test_file], capture_output=True, text=True)
    for line in result.stdout.splitlines():
        if line[0].isdigit():
            results.append(line)
        else:
            print(line)
    for line in result.stderr.splitlines():
        if 'ExperimentalWarning: The ESM module loader is experimental.' not in line:
            print(line)

print()
results = [tuple(map(int, result.split(' / '))) for result in results]
successful, total = reduce(lambda x,y: (x[0]+y[0], x[1]+y[1]), results)
if successful != total:
    print(f'SUMMARY: {total-successful} out of {total} tests \x1b[31mfailed\x1b[0m')
else:
    print(f'SUMMARY: all {total} tests \x1b[32mpassed\x1b[0m')
