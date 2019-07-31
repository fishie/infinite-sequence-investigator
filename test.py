from glob import glob
from subprocess import run

test_files = glob('**/*.tests.js', recursive=True)
for test_file in test_files:
    result = run(['node', '--experimental-modules', test_file], capture_output=True, text=True)
    for line in result.stdout.splitlines():
        print(line)
    for line in result.stderr.splitlines():
        if 'ExperimentalWarning: The ESM module loader is experimental.' not in line:
            print(line)
