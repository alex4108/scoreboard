#!/usr/bin/env bash
set -e

cd backend
bash build.sh
cd ../

cd frontend
bash build.sh
cd ../
