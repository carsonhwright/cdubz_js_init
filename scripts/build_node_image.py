from subprocess import Popen, PIPE
import os
from pathlib import Path
import sys
import argparse

DEF_TOK_FP = Path.home() / ".personal/dev.tok"

def main(path: None, token: None):
    """makes sys call for development container build, needs github access token

    Params
    ------
    path - string: path to where token stored
    token - string: token for github access
    """
    # TODO this missing token arg needs to see one if it doesn't exist
    
    if path:
        fp_token = path
        temp = fp_token
        if not Path(fp_token).exists():
            fp_token =  Path(fp_token).absolute()
            if not fp_token.exists():
                raise FileNotFoundError(f"Could not find token at {temp}\nPlease try again.")

        with open(fp_token, "r") as f:
            s_tok = f.read()

    elif DEF_TOK_FP.exists():
        with open(DEF_TOK_FP, "r") as f:
            s_tok = f.read()
    else:
        s_tok = token

    cmd = ["docker", 
            "build",
            "--build-arg",
            f"TOK={s_tok}",
            "-t",
            "node-24-alpine:node-dev-latest",
            f"{os.getcwd()}"]

    proc = Popen(cmd, stderr=PIPE, stdout=PIPE)
    print_stderr = proc.stderr.read().decode()
    print_stdout = proc.stdout.read().decode()
    print(f"\nSTDOUT:\n{print_stdout}\n\n")
    print(f"\nSTDERR:\n{print_stderr}\n\n")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
            prog = "Node Development Container Builder",
            description="makes sys call for development container build"
            )
    parser.add_argument("-p", "--path")
    parser.add_argument("-t", "--token")
    args = parser.parse_args()
    main(args.path, args.token)
    