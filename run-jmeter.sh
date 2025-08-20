#!/bin/bash
JMETER_PATH=${JMETER_PATH:-jmeter}
TEST_PLAN="simulate-service.jmx"
RESULTS="results.jtl"
LOG_FILE="jmeter.log"

$JMETER_PATH -n -t "$TEST_PLAN" -l "$RESULTS" -j "$LOG_FILE"

echo "Results saved to $RESULTS"
echo "JMeter log saved to $LOG_FILE"
