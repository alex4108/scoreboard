#!/usr/bin/env bash
set -e

cd backend
bash build.sh $1
cd ../

cd frontend
bash build.sh $1
cd ../
