#!/bin/bash
echo "Running Unit Tests..."

NODE_ENV=test mocha --reporter spec app/tests
