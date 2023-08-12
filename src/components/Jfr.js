import React, { useEffect } from 'react';
import $ from 'jquery';

const Jfr = ({jfrdata}) => {

    var lastPressed = undefined;

    useEffect(() => {
        console.log(jfrdata);
    },[jfrdata])

    const starterCall = () => {
        enableFlameGraphs();
        $("#events").find("input").first().click();
        $("#threadFilterOn").on("change", function () {
            if ($(this).prop('checked')) {
                $("#threadFilterContent").show();
            } else {
                $("#threadFilterContent").hide();
            }
        });
        $("#ecidFilterOn").on("change", function () {
            if ($(this).prop('checked')) {
                $("#ecidFilterContent").show();
            } else {
                $("#ecidFilterContent").hide();
            }
        });
        $("#stackTraceFilterOn").on("change", function () {
            if ($(this).prop('checked')) {
                $("#stackTraceFilterContent").show();
            } else {
                $("#stackTraceFilterContent").hide();
            }
        });
        $("#startEndTimestampOn").on("change", function () {
            if ($(this).prop('checked')) {
                $("#startEndTimestampContent").show();
                $("#endDurationOn").prop("checked", false);
                $("#warmupCooldownOn").prop("checked", false);
                $("#warmupDurationOn").prop("checked", false);
                $("#warmupCooldownContent").hide();
                $("#warmupDurationContent").hide();
                $("#endDurationContent").hide();
            } else {
                $("#startEndTimestampContent").hide();
            }
        });
        $("#endDurationOn").on("change", function () {
            if ($(this).prop('checked')) {
                $("#endDurationContent").show();
                $("#startEndTimestampOn").prop("checked", false);
                $("#warmupCooldownOn").prop("checked", false);
                $("#warmupDurationOn").prop("checked", false);
                $("#startEndTimestampContent").hide();
                $("#warmupCooldownContent").hide();
                $("#warmupDurationContent").hide();
            } else {
                $("#endDurationContent").hide();
            }
        });
        $("#warmupCooldownOn").on("change", function () {
            if ($(this).prop('checked')) {
                $("#warmupCooldownContent").show();
                $("#startEndTimestampOn").prop("checked", false);
                $("#endDurationOn").prop("checked", false);
                $("#warmupDurationOn").prop("checked", false);
                $("#startEndTimestampContent").hide();
                $("#endDurationContent").hide();
                $("#warmupDurationContent").hide();
            } else {
                $("#warmupCooldownContent").hide();
            }
        });
        $("#warmupDurationOn").on("change", function () {
            if ($(this).prop('checked')) {
                $("#warmupDurationContent").show();
                $("#startEndTimestampOn").prop("checked", false);
                $("#endDurationOn").prop("checked", false);
                $("#warmupCooldownOn").prop("checked", false);
                $("#startEndTimestampContent").hide();
                $("#endDurationContent").hide();
                $("#warmupCooldownContent").hide();
            } else {
                $("#warmupDurationContent").hide();
            }
        });
    }
    
    const updatePages = (pressed) => {
        if (!pressed) {
            console.log("using last pressed")
            pressed = lastPressed;
        } else {
            console.log("using pressed")
            lastPressed = pressed;
        }
        // console.log(lastPressed.attributes["current"].value)
        updateNotEventDependentPages();
        
        let dataholder = pressed.target.attributes
        let flameGraphUrl = dataholder["flamesurl"].value//$(pressed).data("flamesUrl");
        let totalTimeTableUrl = dataholder["totaltimetableurl"].value//$(pressed).data("totalTimeTableUrl");
        let selfTimeTableUrl = dataholder["selftimetableurl"].value//$(pressed).data("selfTimeTableUrl");
        let totalSelfTimeTableUrl = dataholder["totalselftimetableurl"].value
        let correlationIdStatsUrl = "/stateful-jfr/single/correlation-id-stats?id=" + dataholder["current"].value;
        $(".additional-level:checked").each(function (index) {
            flameGraphUrl = flameGraphUrl + "&" + $(this).attr("name") + "=on"
            totalTimeTableUrl = totalTimeTableUrl + "&" + $(this).attr("name") + "=on"
            selfTimeTableUrl = selfTimeTableUrl + "&" + $(this).attr("name") + "=on"
            totalSelfTimeTableUrl = totalSelfTimeTableUrl + "&" + $(this).attr("name") + "=on"
            // console.log(flameGraphUrl)
        });
        $("#additionalOptionsContainer").find("input:checked").each(function (index) {
            flameGraphUrl = flameGraphUrl + "&" + $(this).attr("name") + "=on"
            totalTimeTableUrl = totalTimeTableUrl + "&" + $(this).attr("name") + "=on"
            selfTimeTableUrl = selfTimeTableUrl + "&" + $(this).attr("name") + "=on"
            totalSelfTimeTableUrl = totalSelfTimeTableUrl + "&" + $(this).attr("name") + "=on"
        });
        $("#tableLimit").each(function (index) {
            totalTimeTableUrl = totalTimeTableUrl + "&" + $(this).attr("name") + "=" + $(this).val();
            selfTimeTableUrl = selfTimeTableUrl + "&" + $(this).attr("name") + "=" + $(this).val();
            totalSelfTimeTableUrl = totalSelfTimeTableUrl + "&" + $(this).attr("name") + "=" + $(this).val();
        });
        $("#additionalFiltersContainer").find("input:checked").each(function (index) {
            flameGraphUrl = flameGraphUrl + "&" + $(this).attr("name") + "=on"
            correlationIdStatsUrl = correlationIdStatsUrl + "&" + $(this).attr("name") + "=on"
            totalTimeTableUrl = totalTimeTableUrl + "&" + $(this).attr("name") + "=on"
            selfTimeTableUrl = selfTimeTableUrl + "&" + $(this).attr("name") + "=on"
            totalSelfTimeTableUrl = totalSelfTimeTableUrl + "&" + $(this).attr("name") + "=on"
        });
        $("#additionalFiltersContainer").find("input[type=text]").each(function (index) {
            let val = encodeURIComponent($(this).val());
            flameGraphUrl = flameGraphUrl + "&" + $(this).attr("name") + "=" + val;
            correlationIdStatsUrl = correlationIdStatsUrl + "&" + $(this).attr("name") + "=" + val;
            totalTimeTableUrl = totalTimeTableUrl + "&" + $(this).attr("name") + "=" + val;
            selfTimeTableUrl = selfTimeTableUrl + "&" + $(this).attr("name") + "=" + val;
            totalSelfTimeTableUrl = totalSelfTimeTableUrl + "&" + $(this).attr("name") + "=" + val;
        });

        let externalContent = $("#externalContent");
        externalContent.data("flameGraphUrl", flameGraphUrl);
        console.log("hii",flameGraphUrl)
        externalContent.data("totalTimeTableUrl", totalTimeTableUrl);
        externalContent.data("selfTimeTableUrl", selfTimeTableUrl);
        externalContent.data("correlationIdStatsUrl", correlationIdStatsUrl);
        externalContent.data("totalSelfTimeTableUrl",totalSelfTimeTableUrl)
        updateExternalContent();


    }

    const updateNotEventDependentPages = () => {
        var cpuStatsUrl = "/stateful-jfr/single/cpu-stats?id=" + jfrdata.uuid;
        $("#additionalFiltersContainer").find("input:checked").each(function (index) {
            cpuStatsUrl = cpuStatsUrl + "&" + $(this).attr("name") + "=on"
            // console.log(cpuStatsUrl)
        });
        $("#additionalFiltersContainer").find("input[type=text]").each(function (index) {
            cpuStatsUrl = cpuStatsUrl + "&" + $(this).attr("name") + "=" + encodeURIComponent($(this).val());
            // console.log(cpuStatsUrl)
        });
        let externalContent = $("#externalContent");
        externalContent.data("cpuStatsUrl", cpuStatsUrl);
        // console.log("cpustaturl",cpuStatsUrl)
        updateExternalContent();
        return false;
    }

    const updateExternalContent = () => {
        let externalContent = $("#externalContent");
        
        let newTabButton = $("#newTab");
        let toShow = externalContent.data("toShow");
        if (toShow !== undefined) {
            let newSrc = externalContent.data(toShow);
            console.log("newsource",newSrc);
            if (newSrc !== undefined) {
                externalContent.attr("src", "http://localhost:8079/"+newSrc);
                newTabButton.attr("href", "http://localhost:8079/"+newSrc);
                
            }
        }
    }
    
    const enableFlameGraphs = () => {
        let externalContent = $("#externalContent");
        let newTabButton = $("#newTab");
        externalContent.show();
        newTabButton.show();
        externalContent.data("toShow", "flameGraphUrl");
        updateExternalContent();
    }
    
    const enableTotalTimeTable = () => {
        let externalContent = $("#externalContent");
        let newTabButton = $("#newTab");
        externalContent.show();
        newTabButton.show();
        externalContent.data("toShow", "totalTimeTableUrl");
        updateExternalContent();
    }

    const enableTotalSelfTimeTable = () => {
        let externalContent = $("#externalContent");
        let newTabButton = $("#newTab");
        externalContent.show();
        newTabButton.show();
        externalContent.data("toShow", "totalSelfTimeTableUrl");
        updateExternalContent();
    }
    
    const enableSelfTimeTable = () => {
        let externalContent = $("#externalContent");
        let newTabButton = $("#newTab");
        externalContent.show();
        newTabButton.show();
        externalContent.data("toShow", "selfTimeTableUrl");
        updateExternalContent();
    }
    
    const enableCorrelationId = () => {
        let externalContent = $("#externalContent");
        let newTabButton = $("#newTab");
        externalContent.show();
        newTabButton.show();
        externalContent.data("toShow", "correlationIdStatsUrl");
        updateExternalContent();
    }
    
    const enableCpu = () => {
        let externalContent = $("#externalContent");
        let newTabButton = $("#newTab");
        externalContent.show();
        newTabButton.show();
        externalContent.data("toShow", "cpuStatsUrl");
        updateNotEventDependentPages();
        updateExternalContent();
    }



  return (
    <div>
      <div className="row">
        <div className="col s2">
          <div className="card">
            <div className="card-content">
              <div className="card-title">What do you need?</div>
              <p>
                <label>
                  <input name="page" type="radio" onClick={() => enableFlameGraphs()} defaultChecked />
                  <span>Flame graphs</span>
                </label>
              </p>
              <p>
                <label>
                  <input name="page" type="radio" onClick={() => enableTotalSelfTimeTable()}  />
                  <span>Total and self time table</span>
                </label>
              </p>
              <p>
                <label>
                  <input name="page" type="radio" onClick={() => enableTotalTimeTable()} />
                  <span>Total time table</span>
                </label>
              </p>
              <p>
                <label>
                  <input className="with-gap" name="page" type="radio" onClick={() => enableSelfTimeTable()} />
                  <span>Self time table</span>
                </label>
              </p>
              <p>
                <label>
                  <input name="page" type="radio" onClick={() => enableCorrelationId()} />
                  <span>Correlation ID stats</span>
                </label>
              </p>
              <p>
                <label>
                  <input name="page" type="radio" onClick={() => enableCpu()} />
                  <span>CPU stats</span>
                </label>
              </p>
              <p className="right-align">
                <a className="waves-effect waves-light btn-small" href='#' style={{ display: 'none' }} target="_blank" id="newTab">
                  <i className="material-icons left">open_in_new</i>Open in new tab
                </a>
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-content" id="events">
              <div className="card-title">Available events</div>

              {/* {jfrdata.jfrParsedFile.heapAllocationSamples.length > 0 ? (
                <p>
                  <label>
                    <input
                      name="event"
                      type="radio"
                      onClick={(e) => updatePages(e)}
                      current={jfrdata.uuid}
                      totaltimetableurl={`/stateful-jfr/single/table/total/execution?id=${jfrdata.uuid}`}
                      selftimetableurl={`/stateful-jfr/single/table/self/execution?id=${jfrdata.uuid}`}
                      flamesurl={`/stateful-jfr/single/flames/execution?id=${jfrdata.uuid}`}
                      totalselftimetableurl={`/stateful-jfr/single/table/totalself/execution?id=${jfrdata.uuid}`}
                    />
                    <span>Heap Allocation samples</span>
                  </label>
                </p>
              ):""} */}

              {jfrdata.jfrParsedFile.executionSamples.length > 0 ? (
                <p>
                  <label>
                    <input
                      name="event"
                      type="radio"
                      onClick={(e) => updatePages(e)}
                      current={jfrdata.uuid}
                      totaltimetableurl={`/stateful-jfr/single/table/total/execution?id=${jfrdata.uuid}`}
                      selftimetableurl={`/stateful-jfr/single/table/self/execution?id=${jfrdata.uuid}`}
                      flamesurl={`/stateful-jfr/single/flames/execution?id=${jfrdata.uuid}`}
                      totalselftimetableurl={`/stateful-jfr/single/table/totalself/execution?id=${jfrdata.uuid}`}
                    />
                    <span>Execution samples</span>
                  </label>
                </p>
              ):""}

              {jfrdata.jfrParsedFile.allocationSamples.length > 0 ? (
                <p>
                  <label>
                    <input
                      name="event"
                      type="radio"
                      onClick={(e) => updatePages(e)}
                      current={jfrdata.uuid}
                      totaltimetableurl={`/stateful-jfr/single/table/total/allocation/count?id=${jfrdata.uuid}`}
                      selftimetableurl={`/stateful-jfr/single/table/self/allocation/count?id=${jfrdata.uuid}`}
                      flamesurl={`/stateful-jfr/single/flames/allocation/count?id=${jfrdata.uuid}`}
                      totalselftimetableurl={`/stateful-jfr/single/table/totalself/allocation/count?id=${jfrdata.uuid}`}
                    />
                    <span>Allocation samples (count)</span>
                  </label>
                </p>
              ):""}

               {jfrdata.jfrParsedFile.allocationSamples.length > 0 ? (
                <p>
                  <label>
                    <input
                      name="event"
                      type="radio"
                      onClick={(e) => updatePages(e)}
                      current={jfrdata.uuid}
                      totaltimetableurl={`/stateful-jfr/single/table/total/allocation/size?id=${jfrdata.uuid}`}
                      selftimetableurl={`/stateful-jfr/single/table/self/allocation/size?id=${jfrdata.uuid}`}
                      flamesurl={`/stateful-jfr/single/flames/allocation/size?id=${jfrdata.uuid}`}
                      totalselftimetableurl={`/stateful-jfr/single/table/totalself/allocation/size?id=${jfrdata.uuid}`}
                    />
                    <span>Allocation samples (size)</span>
                  </label>
                </p>
              ):""}

              {jfrdata.jfrParsedFile.lockSamples.length > 0 ? (
                <p>
                  <label>
                    <input
                      name="event"
                      type="radio"
                      onClick={(e) => updatePages(e)}
                      current={jfrdata.uuid}
                      totaltimetableurl={`/stateful-jfr/single/table/total/lock/count?id=${jfrdata.uuid}`}
                      selftimetableurl={`/stateful-jfr/single/table/self/lock/count?id=${jfrdata.uuid}`}
                      flamesurl={`/stateful-jfr/single/flames/lock/count?id=${jfrdata.uuid}`}
                      totalselftimetableurl={`/stateful-jfr/single/table/totalself/lock/count?id=${jfrdata.uuid}`}
                    />
                    <span>Lock samples (count)</span>
                  </label>
                </p>
              ):""}

              {jfrdata.jfrParsedFile.lockSamples.length > 0 ? (
                <p>
                  <label>
                    <input
                      name="event"
                      type="radio"
                      onClick={(e) => updatePages(e)}
                      current={jfrdata.uuid}
                      totaltimetableurl={`/stateful-jfr/single/table/total/lock/time?id=${jfrdata.uuid}`}
                      selftimetableurl={`/stateful-jfr/single/table/self/lock/time?id=${jfrdata.uuid}`}
                      flamesurl={`/stateful-jfr/single/flames/lock/time?id=${jfrdata.uuid}`}
                      totalselftimetableurl={`/stateful-jfr/single/table/totalself/lock/time?id=${jfrdata.uuid}`}
                    />
                    <span>Lock samples (time)</span>
                  </label>
                </p>
              ):""}

            </div>
          </div>
        </div>

        <div className="col s3">
            <div className="card" id="additionalOptionsContainer">
                <div className="card-content">
                    <div className="card-title">
                        Additional options
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="tableLimit" name="tableLimit" type="text" value="10000"/>
                            <label for="tableLimit">Table limit</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <label>
                                <input id="reverseOn" name="reverseOn" type="checkbox"/>
                                <span>Reverse flame graph</span>
                            </label>
                        </div>
                    </div>
                    <p className="right-align">
                        <a className="waves-effect waves-light btn-small" onclick={(e) => updatePages()}>
                            <i className="material-icons left">replay</i>reload
                        </a>
                    </p>
                </div>
            </div>

            <div className="card" id="additionalFiltersContainer">
                <div className="card-content">
                    <div className="card-title">
                        Additional filters
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <label>
                                <input id="threadFilterOn" name="threadFilterOn" type="checkbox"/>
                                <span>Thread filter</span>
                            </label>
                        </div>
                        <div id="threadFilterContent" style={{ display: 'none' }}>
                            <div className="input-field col s12">
                                <input id="threadFilter" name="threadFilter" type="text"/>
                                <label for="threadFilter">Thread filter</label>
                            </div>
                        </div>

                        <div className="input-field col s12">
                            <label>
                                <input id="stackTraceFilterOn" name="stackTraceFilterOn" type="checkbox"/>
                                <span>Stack trace filter</span>
                            </label>
                        </div>
                        <div id="stackTraceFilterContent" style={{ display: 'none' }}>
                            <div className="input-field col s12">
                                <input id="stackTraceFilter" name="stackTraceFilter" type="text"/>
                                <label for="stackTraceFilter">Stack trace filter</label>
                            </div>
                        </div>

                        <div className="input-field col s12">
                            <label>
                                <input id="ecidFilterOn" name="ecidFilterOn" type="checkbox"/>
                                <span>Correlation id filter</span>
                            </label>
                        </div>
                        <div id="ecidFilterContent" style={{ display: 'none' }}>
                            <div className="input-field col s12">
                                <input id="ecidFilter" name="ecidFilter" type="text"/>
                                <label for="ecidFilter">Correlation id filter</label>
                            </div>
                        </div>

                        <div className="input-field col s12">
                            <label>
                                <input id="endDurationOn" name="endDurationOn" type="checkbox"/>
                                <span>Access log filter</span>
                            </label>
                        </div>
                        <div id="endDurationContent" style={{ display: 'none' }}>
                            <div className="input-field col s12">
                                <input id="endDate" name="endDate" type="text"/>
                                <label for="endDate">End date</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="endDateDateTimeFormat" name="endDateDateTimeFormat" type="text"
                                       value="dd/MMM/yyyy:HH:mm:ss Z"/>
                                <label for="endDateDateTimeFormat">End date format</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="duration" name="duration" type="text"/>
                                <label for="duration">Duration (ms)</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="localeLanguage" name="localeLanguage" type="text" value="EN"/>
                                <label for="localeLanguage">Locale language</label>
                            </div>
                        </div>

                        <div className="input-field col s12">
                            <label>
                                <input id="startEndTimestampOn" name="startEndTimestampOn" type="checkbox"/>
                                <span>Start/end timestamp filter</span>
                            </label>
                        </div>
                        <div id="startEndTimestampContent" style={{ display: 'none' }}>
                            <div className="input-field col s12">
                                <input id="startTs" name="startTs" type="text"/>
                                <label for="startTs">Start timestamp (s)</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="endTs" name="endTs" type="text"/>
                                <label for="endTs">End timestamp (s)</label>
                            </div>
                        </div>

                        <div className="input-field col s12">
                            <label>
                                <input id="warmupCooldownOn" name="warmupCooldownOn" type="checkbox"/>
                                <span>Warmup/cooldown filter</span>
                            </label>
                        </div>
                        <div id="warmupCooldownContent" style={{ display: 'none' }}>
                            <div className="input-field col s12">
                                <input id="warmup" name="warmup" type="text"/>
                                <label for="warmup">Warmup (s)</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="cooldown" name="cooldown" type="text"/>
                                <label for="cooldown">Cooldown (s)</label>
                            </div>
                        </div>

                        <div className="input-field col s12">
                            <label>
                                <input id="warmupDurationOn" name="warmupDurationOn" type="checkbox"/>
                                <span>Warmup/duration filter</span>
                            </label>
                        </div>
                        <div id="warmupDurationContent" style={{ display: 'none' }}>
                            <div className="input-field col s12">
                                <input id="wdWarmup" name="wdWarmup" type="text"/>
                                <label for="wdWarmup">Warmup (s)</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="wdDuration" name="wdDuration" type="text"/>
                                <label for="wdDuration">Duration (s)</label>
                            </div>
                        </div>
                        <div className="input-field col s12">
                            <label>
                                <input id="consumeCpuOn" name="consumeCpuOn" type="checkbox"/>
                                <span>Consume CPU</span>
                            </label>
                        </div>
                    </div>
                    <p className="right-align">
                        <a className="waves-effect waves-light btn-small" onclick={() => updatePages()}>
                            <i className="material-icons left">replay</i>reload
                        </a>
                    </p>
                </div>
            </div>

            <div className="card">
                <div className="card-content">
                    <div className="card-title">
                        Additional levels
                    </div>

                    <div>
                        <div className="row">
                            <div className="input-field col s12">
                                <label>
                                    <input className="additional-level" id="extractThreads" name="extractThreads"
                                           type="checkbox"/>
                                    <span>Thread</span>
                                </label>
                            </div>
                            <div className="input-field col s12">
                                <label>
                                    <input className="additional-level" id="extractTs10S" name="extractTs10S"
                                           type="checkbox"/>
                                    <span>Timestamp (10s window)</span>
                                </label>
                            </div>
                            <div className="input-field col s12">
                                <label>
                                    <input className="additional-level" id="extractTs1S" name="extractTs1S"
                                           type="checkbox"/>
                                    <span>Timestamp (1s window)</span>
                                </label>
                            </div>
                            <div className="input-field col s12">
                                <label>
                                    <input className="additional-level" id="extractTs100Ms" name="extractTs100Ms"
                                           type="checkbox"/>
                                    <span>Timestamp (100ms window)</span>
                                </label>
                            </div>
                            <div className="input-field col s12">
                                <label>
                                    <input className="additional-level" id="extractFilename" name="extractFilename"
                                           type="checkbox"/>
                                    <span>Filename</span>
                                </label>
                            </div>
                            <div className="input-field col s12">
                                <label>
                                    <input className="additional-level" id="extractEcid" name="extractEcid"
                                           type="checkbox"/>
                                    <span>Correlation ID</span>
                                </label>
                            </div>
                            <div className="input-field col s12">
                                <label>
                                    <input className="additional-level" id="extractLineNumbers" name="extractLineNumbers"
                                           type="checkbox"/>
                                    <span>Line numbers</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <p className="right-align">
                        <a className="waves-effect waves-light btn-small" onclick={() => updatePages()}>
                            <i className="material-icons left">replay</i>reload
                        </a>
                    </p>
                </div>
            </div>
        </div>

        <div className="col s10">
            <div className="card">
                <div className="card-content">
                    <iframe  title="jfrViewRendere" id="externalContent" width="100%" height="1000px" frameBorder="0" style={{display:"none"}}></iframe>
                </div>
            </div>
        </div>
      </div>
      {starterCall()}
    </div>
  );
};




export default Jfr;