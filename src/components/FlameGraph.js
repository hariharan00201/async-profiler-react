import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const FlameGraph = () => {
    const {id} = useParams();
    
    const {data,loading,err} = useSelector((state) => state.flameData)
    var report;
    useEffect(() => {
        
    },[data,loading,err])


    var root , rootLevel, px, pattern
    var reverse = false;
    const levels = Array(66);
    
    var reportObj;//JSON.parse(report);
    var dataaa = {};
    

    var canvas ;
    var c ;
    var hl ;
    var status;

    var canvasWidth;
    var canvasHeight;
    // canvas.style.width = canvasWidth + 'px';
    // canvas.width = canvasWidth * (devicePixelRatio || 1);
    // canvas.height = canvasHeight * (devicePixelRatio || 1);
    // if (devicePixelRatio) c.scale(devicePixelRatio, devicePixelRatio);
    // c.font = document.body.style.font;

    const palette = [
        [0xb2e1b2, 20, 20, 20],
        [0x50e150, 30, 30, 30],
        [0x50cccc, 30, 30, 30],
        [0xe15a5a, 30, 40, 40],
        [0xc8c83c, 30, 30, 10],
        [0xe17d00, 30, 30,  0],
        [0xcce880, 20, 20, 20],
    ];

    function getColor(p) {
        const v = Math.random();
        return '#' + (p[0] + ((p[1] * v) << 16 | (p[2] * v) << 8 | (p[3] * v))).toString(16);
    }

    function f(level, left, width, type, title, inln, c1, int) {

        var temp = level+left+width+type;
        dataaa[temp+";level;"+title+";"+level] = title;
        dataaa[temp+";left;"+title+";"+left] = title;
        dataaa[temp+";width;"+title+";"+width] = title;
        dataaa[temp+";type;"+title+";"+type] = title;
        dataaa[temp+";inln;"+title+";"+inln] = title;
        dataaa[temp+";c1;"+title+";"+c1] = title;
        dataaa[temp+";int;"+title+";"+int] = title;

        var t1 = {left: left, width: width, color: getColor(palette[type]), title: title,
            details: (int ? ', int=' + int : '') + (c1 ? ', c1=' + c1 : '') + (inln ? ', inln=' + inln : '')
        };
        var t2 = document.getElementById("detailed");
        var t3 = document.createElement("div")
        t3.addEventListener('click',(event) => {
            render(t1,level);
        })
        t3.innerText = title;
        t2.appendChild(t3);
        levels[level].push(t1);
    }

    function samples(n) {
        return n === 1 ? '1 sample' : n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' samples';
    }

    function pct(a, b) {
        return a >= b ? '100' : (100 * a / b).toFixed(2);
    }

    function getKeysByValue(object, value) {
        return Object.keys(object).filter(key => object[key] === value);
    }

    function getAllValuesOfTypeJava(object) {
        let regex =  new RegExp('.*type.*1$');//*TYPE.*1$/;
        let result = [];
        for (let key in object) {
        if (regex.test(key)) {
            let value = object[key];
            result.push(value);
        }
    }
        return result;
    }

    function separateLevelsOfJava(){
        let javas = getAllValuesOfTypeJava(dataaa);
        // console.log(javas)
        let hierarchy = {
        level1 : {},
        level2 : {},
        level3 : {}
    };

        for(let i=0; i<javas.length; i++) {
            let java = javas[i];
            let javasplit = java.split("/");
            // console.log(java)
            if(javasplit.length >= 3){

                hierarchy.level3[javasplit[0]+'/'+javasplit[1]+'/'+javasplit[2]] = reportObj[javasplit[0]+'/'+javasplit[1]+'/'+javasplit[2]];
                hierarchy.level2[javasplit[0]+'/'+javasplit[1]] = reportObj[javasplit[0]+'/'+javasplit[1]];
                hierarchy.level1[javasplit[0]] = reportObj[javasplit[0]];
            }
            else if(javasplit.length == 2){
                hierarchy.level2[javasplit[0]+'/'+javasplit[1]] = reportObj[javasplit[0]+'/'+javasplit[1]];
                hierarchy.level1[javasplit[0]] = reportObj[javasplit[0]];
            }
            else{
                hierarchy.level1[javasplit[0]] = reportObj[javasplit[0]];
            }
        }
        // console.log(hierarchy)
        return hierarchy;
    }

    function findFrame(frames, x) {
        let left = 0;
        let right = frames.length - 1;

        while (left <= right) {
            const mid = (left + right) >>> 1;
            const f = frames[mid];

            if (f.left > x) {
                right = mid - 1;
            } else if (f.left + f.width <= x) {
                left = mid + 1;
            } else {
                return f;
            }
        }

        if (frames[left] && (frames[left].left - x) * px < 0.5) return frames[left];
        if (frames[right] && (x - (frames[right].left + frames[right].width)) * px < 0.5) return frames[right];

        return null;
    }

    function showReport() {

        var hierarchy = separateLevelsOfJava();

        var level1list = Object.entries(hierarchy.level1).sort((a, b) => b[1] - a[1]);
        var level2list = Object.entries(hierarchy.level2).sort((a, b) => b[1] - a[1]);
        var level3list = Object.entries(hierarchy.level3).sort((a, b) => b[1] - a[1]);

        var count  = 0 ;
        for(let val of level1list){
            // console.log(val)
            if(count < 10)
            reportHelper(true,val[0],"level1");
            else break;
            count = count+1;
        }
        count  = 0 ;
        for(let val of level2list){
            if(count < 10)
            reportHelper(true,val[0],"level2");
            else break;
            count = count+1;
        }
        count  = 0 ;
        for(let val of level3list){
            if(count < 10)
            reportHelper(true,val[0],"level3");
            else break;
            count = count+1;
        }
	}

	function addElementToLevel(level,query,total) {
		const lvl1 = document.getElementById(level);
		const divObj = document.createElement("div");
        divObj.addEventListener('click',(event) => {
            if (!divObj.contains(event.target)) {
                // divObj.style.color = 'green';
            }else{
                search(query);
                // divObj.style.color = 'yellow';
            }
        })
		divObj.innerText = query+" = "+total;
		lvl1.appendChild(divObj);
	}

	function reportHelper(r,query,level) {
        // var t = query.indexOf("*"|"(")
        // if(t>0)
        // query = query.substring(0,t);
        // query = '['+query+']'
		if (r === true && (r = query) === null) {
			return;
		}

        try{
		    pattern = r ? RegExp(r) : undefined;
        }catch(e){
            return;
        }
		const matched = render(root, rootLevel);
        let temp = pct(matched,root.width);
        if(temp > 0)
		addElementToLevel(level,query,temp);

	}

    function search(r) {
        if (r === true && (r = prompt('Enter regexp to search:', '')) === null) {
            return;
        }

        pattern = r ? RegExp(r) : undefined;
        const matched = render(root, rootLevel);
        document.getElementById('matchval').textContent = pct(matched, root.width) + '%';
        document.getElementById('match').style.display = r ? 'inherit' : 'none';
    }

    function render(newRoot, newLevel) {
        if (root) {
            c.fillStyle = '#ffffff';
            c.fillRect(0, 0, canvasWidth, canvasHeight);
        }

        root = newRoot || levels[0][0];
        rootLevel = newLevel || 0;
        px = canvasWidth / root.width;

        const x0 = root.left;
        const x1 = x0 + root.width;
        const marked = [];

        function mark(f) {
            return marked[f.left] >= f.width || (marked[f.left] = f.width);
        }

        function totalMarked() {
            let total = 0;
            let left = 0;
            Object.keys(marked).sort(function(a, b) { return a - b; }).forEach(function(x) {
                if (+x >= left) {
                    total += marked[x];
                    left = +x + marked[x];
                }
            });
            return total;
        }

        function drawFrame(f, y, alpha) {
            if (f.left < x1 && f.left + f.width > x0) {
                c.fillStyle = pattern && f.title.match(pattern) && mark(f) ? '#ee00ee' : f.color;
                c.fillRect((f.left - x0) * px, y, f.width * px, 15);

                if (f.width * px >= 21) {
                    const chars = Math.floor(f.width * px / 7);
                    const title = f.title.length <= chars ? f.title : f.title.substring(0, chars - 2) + '..';
                    c.fillStyle = '#000000';
                    c.fillText(title, Math.max(f.left - x0, 0) * px + 3, y + 12, f.width * px - 6);
                }

                if (alpha) {
                    c.fillStyle = 'rgba(255, 255, 255, 0.5)';
                    c.fillRect((f.left - x0) * px, y, f.width * px, 15);
                }
            }
        }

        for (let h = 0; h < levels.length; h++) {
            const y = reverse ? h * 16 : canvasHeight - (h + 1) * 16;
            const frames = levels[h];
            for (let i = 0; i < frames.length; i++) {
                drawFrame(frames[i], y, h < rootLevel);
            }
        }

        return totalMarked();
    }

    



    const helper = (Data) => {
        report = Data.result;
        reportObj = report;
        for (let h = 0; h < levels.length; h++) {
        levels[h] = [];
    }
         canvas = document.getElementById('canvas');
         c = canvas.getContext('2d');
         hl = document.getElementById('hl');
         status = document.getElementById('status');
    
         canvasWidth = canvas.offsetWidth;
         canvasHeight = canvas.offsetHeight;
        canvas.style.width = canvasWidth + 'px';
        canvas.width = canvasWidth * (devicePixelRatio || 1);
        canvas.height = canvasHeight * (devicePixelRatio || 1);
        if (devicePixelRatio) c.scale(devicePixelRatio, devicePixelRatio);
        c.font = document.body.style.font;

        const starter = () => {
            const fcallers = Data.fDataHolderList;
            fcallers.map((fra) => f(fra.level,fra.left,fra.width,fra.type,fra.title,fra.inln,fra.c1,fra.Int))
        }
        starter();

        canvas.onmousemove = (event) => {
            const h = Math.floor((reverse ? event.offsetY : (canvasHeight - event.offsetY)) / 16);
            if (h >= 0 && h < levels.length) {
                const f = findFrame(levels[h], event.offsetX / px + root.left);
                if (f) {
                    if (f != root) getSelection().removeAllRanges();
                    hl.style.left = (Math.max(f.left - root.left, 0) * px + canvas.offsetLeft) + 'px';
                    hl.style.width = (Math.min(f.width, root.width) * px) + 'px';
                    hl.style.top = ((reverse ? h * 16 : canvasHeight - (h + 1) * 16) + canvas.offsetTop) + 'px';
                    hl.firstChild.textContent = f.title;
                    hl.style.display = 'block';
                    canvas.title = f.title + '\n(' + samples(f.width) + f.details + ', ' + pct(f.width, levels[0][0].width) + '%)';
                    canvas.style.cursor = 'pointer';
                    canvas.onclick = function() {
                        if (f != root) {
                            render(f, h);
                            canvas.onmousemove();
                        }
                    };
                    status.textContent = 'Function: ' + canvas.title;
                    return;
                }
            }
            canvas.onmouseout();
        }
    
        canvas.onmouseout = function() {
            hl.style.display = 'none';
            status.textContent = '\xa0';
            canvas.title = '';
            canvas.style.cursor = '';
            canvas.onclick = '';
        }
    
        canvas.ondblclick = function() {
            getSelection().selectAllChildren(hl);
        }
    
        document.getElementById('reverse').onclick = function() {
            reverse = !reverse;
            render();
        }
    
        document.getElementById('search').onclick = function() {
            search(true);
        }
    
        document.getElementById('reset').onclick = function() {
            search(false);
        }
    
        window.onkeydown = (event) => {
            if (event.ctrlKey && event.keyCode === 70) {
                event.preventDefault();
                search(true);
            } else if (event.keyCode === 27) {
                search(false);
            }
        }

        search();
     showReport();

    
    
    }
    
    

    return (
        <div>
            {/* <meta charSet="utf-8" />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n        body {margin: 0; padding: 10px; background-color: #ffffff}\n        h1 {margin: 5px 0 0 0; font-size: 18px; font-weight: normal; text-align: center}\n        header {margin: -24px 0 5px 0; line-height: 24px}\n        button {font: 12px sans-serif; cursor: pointer}\n        p {margin: 5px 0 5px 0}\n        a {color: #0366d6}\n        #hl {position: absolute; display: none; overflow: hidden; white-space: nowrap; pointer-events: none; background-color: #ffffe0; outline: 1px solid #ffc000; height: 15px}\n        #hl span {padding: 0 3px 0 3px}\n        #status {overflow: hidden; white-space: nowrap}\n        #match {overflow: hidden; white-space: nowrap; display: none; float: right; text-align: right}\n        #reset {cursor: pointer}\n        #canvas {width: 100%; height: 1056px}\n    "
    }}
  />
<h1>Flame graph - </h1>
<header style={{textAlign: "left"}}><button id='reverse' title='Reverse'>&#x1f53b;</button>&nbsp;&nbsp;<button id='search' title='Search'>&#x1f50d;</button></header>
<header style={{textAlign: 'right'}}>Produced by <a href='https://github.com/jvm-profiling-tools/async-profiler'>async-profiler</a></header>
<div style={{ display: "flex" }}>
    <canvas id='canvas' style={{width: "75%"}}></canvas>
    <div id="report"><h3>Report:</h3><br/>
        <h4>Level 1</h4>
        <div id="level1"></div>
        <h4>Level 2</h4>
        <div id="level2"></div>
        <h4>Level 3</h4>
        <div id="level3"></div>
    </div>
</div>

<div id='hl'><span></span></div>
<p id='match'>Matched: <span id='matchval'></span> <span id='reset' title='Clear'>&#x274c;</span></p>
<p id='status'>&nbsp;</p>
<div id="detailed">

</div>
            {
                loading != null && loading === false && data != null  ?  
                helper(data)
                 : "Loading..."
            }
             */}
{/* {console.log(data)} */}
<iframe src={'http://localhost:8079'+data}  title="jfrViewRendere" id="externalContent" width="100%" height="1000px" frameBorder="0" ></iframe>
                
        </div>
    );
};


export default FlameGraph;