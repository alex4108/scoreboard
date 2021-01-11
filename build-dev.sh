#!/usr/bin/env bash
set -e

cd backend
bash build-dev.sh
cd ../

cd frontend
bash build-dev.sh
cd ../
