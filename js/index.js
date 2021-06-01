(function ($) {

    const baseUrl = "192.168.1.222:6688";

    // 是否选择mock数据查看
    const isMock = true;

    let initWarmList = [{value: "暂无警报", time: new Date().getTime(), roomId: -9999, addr: -9999}];

    // 初始模式 平常模式：1，负载模式：0
    let currentType = 1;

    const pageSize = 6;

    let maxPageNumber = 0;

    // 当前页码
    let currentPageNumber = 1;

    let warmRoomList = initWarmList;

    // 大屏房间数据
    let roomList = [];

    // 异常数组描述
    const problembitsArray = [
        {key: 0, value: 0, text: ""},
        {key: 1, value: 0, text: ""},
        {key: 2, value: 0, text: ""},
        {key: 3, value: 0, text: ""},
        {key: 4, value: 0, text: ""},
        {key: 5, value: 0, text: "PM2.5报警"},
        {key: 6, value: 0, text: "湿度报警"},
        {key: 7, value: 0, text: "温度报警"},
        {key: 8, value: 0, text: ""},
        {key: 9, value: 0, text: ""},
        {key: 10, value: 0, text: "出风阀异常"},
        {key: 11, value: 0, text: "进风阀异常"},
        {key: 12, value: 0, text: ""},
        {key: 13, value: 0, text: "过滤器压差传感器异常"},
        {key: 14, value: 0, text: "压力传感器异常"},
        {key: 15, value: 0, text: "环境传感器异常"},
    ];


    // mock大屏数据
    let mockData = {
        "code": 0,
        "message": "",
        "data": {
            "fanlist": [
                {"id": 1, "status": 1},
                {"id": 2, "status": 1},
                {"id": 3, "status": 1},
                {"id": 4, "status": 0},
                {"id": 5, "status": 0}],
            "roomlist": [{
                "id": 1,
                "addr": 101,
                "problembits": 32,
                "lastTick": 1620343155273,
                "online": 1,
                "infos": {"temp": 267, "hum": 523, "press": 47, "filter": -220, "pm25": 434}
            },
                {
                    "id": 1,
                    "addr": 102,
                    "problembits": 64,
                    "lastTick": 1620343155273,
                    "online": 1,
                    "infos": {"temp": 267, "hum": 523, "press": 47, "filter": -220, "pm25": 434}
                },
                {
                    "id": 1,
                    "addr": 103,
                    "problembits": 128,
                    "lastTick": 1620343155273,
                    "online": 1,
                    "infos": {"temp": 267, "hum": 523, "press": 47, "filter": -220, "pm25": 434}
                },
                {
                    "id": 1,
                    "addr": 104,
                    "problembits": 8192,
                    "lastTick": 1620343155273,
                    "online": 1,
                    "infos": {"temp": 267, "hum": 523, "press": 47, "filter": -220, "pm25": 434}
                },
                {
                    "id": 1,
                    "addr": 105,
                    "problembits": 8416,
                    "lastTick": 1620343155273,
                    "online": 1,
                    "infos": {"temp": 267, "hum": 523, "press": 47, "filter": -220, "pm25": 434}
                },
                {
                    "id": 7,
                    "addr": 201,
                    "problembits": 96,
                    "lastTick": 1620343155273,
                    "online": 1,
                    "infos": {"temp": 267, "hum": 523, "press": 47, "filter": -220, "pm25": 434}
                }, {"id": 8, "addr": 202, "lastTick": 0, "online": 0}, {
                    "id": 9,
                    "addr": 203,
                    "lastTick": 1620343157159,
                    "online": 1,
                    "problembits": 0
                }, {
                    "id": 10,
                    "addr": 204,
                    "lastTick": 1620343161158,
                    "online": 1,
                    "infos": {"temp": 315, "hum": 545, "press": 21, "filter": -78, "pm25": 264},
                    "problembits": 128
                }, {
                    "id": 11,
                    "addr": 205,
                    "lastTick": 1620343165164,
                    "online": 1,
                    "infos": {"temp": 378, "hum": 703, "press": 78, "filter": -54, "pm25": 427},
                    "problembits": 0
                }, {
                    "id": 12,
                    "addr": 206,
                    "lastTick": 1620343169164,
                    "online": 1,
                    "infos": {"temp": 369, "hum": 737, "press": 159, "filter": -119, "pm25": 479},
                    "problembits": 0
                }, {
                    "id": 13,
                    "addr": 13,
                    "lastTick": 1620343173166,
                    "online": 1,
                    "infos": {"temp": 303, "hum": 705, "press": 147, "filter": -198, "pm25": 469},
                    "problembits": 0
                }, {
                    "id": 14,
                    "addr": 14,
                    "lastTick": 1620343177167,
                    "online": 1,
                    "infos": {"temp": 267, "hum": 688, "press": 102, "filter": -142, "pm25": 359},
                    "problembits": 0
                }, {
                    "id": 15,
                    "addr": 15,
                    "lastTick": 1620343181165,
                    "online": 1,
                    "infos": {"temp": 398, "hum": 731, "press": 126, "filter": -121, "pm25": 447},
                    "problembits": 0
                }, {
                    "id": 16,
                    "addr": 16,
                    "lastTick": 1620343185166,
                    "online": 1,
                    "infos": {"temp": 375, "hum": 689, "press": 41, "filter": -207, "pm25": 446},
                    "problembits": 0
                }, {
                    "id": 17,
                    "addr": 17,
                    "lastTick": 1620343189175,
                    "online": 1,
                    "infos": {"temp": 311, "hum": 675, "press": 96, "filter": -152, "pm25": 452},
                    "problembits": 0
                }, {"id": 18, "addr": 18, "lastTick": 0, "online": 0}, {
                    "id": 19,
                    "addr": 19,
                    "lastTick": 0,
                    "online": 0
                }],
            "out": {"temp": 0, "hum": 0, "press": 0, "filter": 0, "pm25": 0}
        }
    };


    // mock表格数据
    let mockTableData = {
        "code": 0,
        "message": "",
        "data": {
            "start": 0,
            "pageSize": 5,
            "totalCount": 100,
            "list": [
                {"time": "2021-01-01 00:00:00", "addr": 201, "problembits": 32},
                {"time": "2021-01-01 00:00:00", "addr": 202, "problembits": 64},
                {"time": "2021-01-01 00:00:00", "addr": 203, "problembits": 96},
                {"time": "2021-01-01 00:00:00", "addr": 204, "problembits": 128},
                {"time": "2021-01-01 00:00:00", "addr": 205, "problembits": 1024},
                {"time": "2021-01-01 00:00:00", "addr": 206, "problembits": 8192},
                {"time": "2021-01-01 00:00:00", "addr": 207, "problembits": 12736},
            ]
        }
    };

    // ajax
    let ajaxUtilGet = function (url, successEvent, errorEvent) {
        $.ajax({
            //请求方式
            type: "GET",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url: url,
            //数据，json字符串
            data: JSON.stringify({}),
            //请求成功
            success: function (result) {

                successEvent && successEvent(result);
            },
            //请求失败，包含具体的错误信息
            error: function (e) {
                errorEvent && errorEvent(e);
                console.log(e.status);
                // alert(e.responseText);
            }
        });

    };

    // 处理problembits数据描述
    let dealProblembits = function (value) {
        let relStr = [];
        let relArray = parseInt(value).toString(2).split("").reverse();
        for (let i = 0; i < relArray.length; i++) {
            if (relArray[i] == 1) {
                if (i >= problembitsArray.length) continue;
                relStr.push(problembitsArray[i].text);
            }
        }
        return relStr.filter((item) => item.length > 0).join(",");
    };

    // 处理problembits数据成相应字段
    let dealProblembitObj = function (value) {
        let relObj = {
            tempWarn: false,
            humWarn: false,
            pressWarn: false,
            pm25Warn: false
        };
        let relArray = parseInt(value).toString(2).split("").reverse();
        if (relArray[5] == 1) {
            relObj.pm25Warn = true;
        }
        if (relArray[6] == 1) {
            relObj.humWarn = true;
        }
        if (relArray[7] == 1) {
            relObj.tempWarn = true;
        }
        if (relArray[13] == 1) {
            relObj.pressWarn = true;
        }
        return relObj;
    };

    // 加载风机
    let loadWindView = function (list = []) {
        let str = '<p class="middleView2P">风机状态</p>';
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            str += '<div class="windImageView">';
            if (item.status == 1) {
                str += '    <img src="image/she_icon.png" class="windImageStyle">';
            } else {
                str += '    <img src="image/she_bray_icon.png" class="windImageStyle">';
            }
            str += `    <p class="windTextStyle">风机${item?.id}</p>`;
            str += '</div>';
        }
        $("#windView").html(str);
    };

    // 除10保留1位小数
    let caculateNumber = function (num) {
        if (num == undefined) return 0;
        return Number(num / 10).toFixed(1);
    };

    // 加载大厅数据展示
    let loadBigRoomDataShow = function (item) {
        $("#bidRoomData1").text(caculateNumber(item?.temp));
        $("#bidRoomData2").text(caculateNumber(item?.hum));
        $("#bidRoomData3").text(caculateNumber(item?.pm25));
    };

    // 加载房间选项
    let loadItemRoom = function (list = []) {
        roomList = list;
        warmRoomList = initWarmList;
        let str = '';
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            let isWarn = false;
            let online = true;
            // 在离线
            if (item?.online == 1) {
                online = true;
            } else {
                online = false;
            }
            // 是否有警报
            if (item?.problembits && item?.problembits != 0) {
                isWarn = true;
                if (warmRoomList[0].roomId == -9999) {
                    warmRoomList = [];
                }
                warmRoomList.push({
                    value: item.problembits,
                    time: item.lastTick,
                    roomId: item.id,
                    addr: item.addr
                });

                if (warmRoomList.length == 1 && warmRoomList[0].roomId != -9999) {
                    loadWarmRoomList(warmRoomList[0]);
                }
            }

            str += '<div class="itemView">';
            str += '      <div class="itemTopView">';
            str += `          <p class="roomTextStyle">房间${item?.addr}</p>`;
            if (isWarn) {
                str += '          <div class="circleStyle warmBg"></div>';
            } else if (!online) {
                str += '          <div class="circleStyle outlineBg"></div>';
            } else {
                str += '          <div class="circleStyle"></div>';
            }
            str += '      </div>';
            str += '      <div class="itemMiddleView">';
            str += '          <p class="p1">室内压差：</p>';
            if (isWarn && dealProblembitObj(item?.problembits).pressWarn) {
                str += `          <p class="p2 warm">${caculateNumber(item?.infos?.press)}</p>`;
            } else {
                str += `          <p class="p2">${caculateNumber(item?.infos?.press)}</p>`;
            }
            str += '          <p class="p3">Pa</p>';
            str += '      </div>';
            str += '      <div class="itembottomView">';
            str += '          <div class="iconView">';
            str += '              <img src="image/water_icon.png" class="iconImageView"/>';
            str += '              <div>';
            str += '                   <p class="p4">室内温度</p>';
            if (isWarn && dealProblembitObj(item?.problembits).tempWarn) {
                str += `                   <p class="p4"><span class="p5 warm">${caculateNumber(item?.infos?.temp)}</span>℃</p>`;
            } else {
                str += `                   <p class="p4"><span class="p5">${caculateNumber(item?.infos?.temp)}</span>℃</p>`;
            }
            str += '              </div>';
            str += '           </div>';

            str += '          <div class="iconView">';
            str += '              <img src="image/wather_icon.png" class="iconImageView"/>';
            str += '              <div>';
            str += '                   <p class="p4">室内湿度</p>';
            if (isWarn && dealProblembitObj(item?.problembits).humWarn) {
                str += `                  <p class="p4"><span class="p5 warm">${caculateNumber(item?.infos?.hum)}</span>%rh</p>`;
            } else {
                str += `                  <p class="p4"><span class="p5">${caculateNumber(item?.infos?.hum)}</span>%rh</p>`;
            }
            str += '              </div>';
            str += '           </div>';

            str += '          <div class="iconView">';
            str += '              <img src="image/pm_icon.png" class="iconImageView"/>';
            str += '              <div>';
            str += '                   <p class="p4">室内PM2.5</p>';
            if (isWarn && dealProblembitObj(item?.problembits).pm25Warn) {
                str += `                   <p class="p4"><span class="p5 warm">${caculateNumber(item?.infos?.pm25)}</span>ug/m3</p>`;
            } else {
                str += `                   <p class="p4"><span class="p5">${caculateNumber(item?.infos?.pm25)}</span>ug/m3</p>`;
            }
            str += '              </div>';
            str += '           </div>';
            str += '       </div>';
            str += '</div>';
        }

        $("#bidRoomDataShowList").html(str);
    };

    // 加载select
    let loadSelectView = function (mlist = []) {
        let str = "<option value='0'>全部</option>";
        for (let i = 0; i < mlist.length; i++) {
            let item = mlist[i];
            str += `<option value="` + item.id + `">房间${item.addr}</option>`
        }

        $("#selectViewStyle").html(str);
    };

    // 加载table
    let loadTableView = function (mlist = []) {
        let str = "";
        for (let i = 0; i < Math.min(mlist.length, pageSize); i++) {
            let item = mlist[i];
            str += "<tr>";
            str += `    <td class="tdTextStyle">${i + 1 + pageSize * (currentPageNumber - 1)}</td>`;
            str += `    <td class="tdTextStyle">${item.time}</td>`;
            str += `    <td class="tdTextStyle">房间${item.addr}</td>`;
            str += `    <td class="tdTextStyle">${dealProblembits(item.problembits)}</td>`;
            str += "</tr>";
        }

        $("#tableBody").html(str);
    };

    // 加载页码
    let loadPageView = function (totalPage = 0) {
        let pageMaxNUmber = Math.ceil(totalPage / pageSize);

        maxPageNumber = pageMaxNUmber;

        let str = "<li>";
        str += '    <a href="#" aria-label="Previous" class="prePage">';
        str += '        <span aria-hidden="true">上一页</span>';
        str += '    </a>';
        str += '</li>';
        for (let i = 1; i <= Math.min(7, pageMaxNUmber); i++) {
            if (i == currentPageNumber) {
                str += `<li><a href="#" class="pageNumerLi active">${i}</a></li>`;
            } else {
                str += `<li><a href="#" class="pageNumerLi">${i}</a></li>`;
            }
        }
        if (pageMaxNUmber > 7) {
            if (currentPageNumber > 7) {
                str += `<li><a href="#" class="active">...</a></li>`;
            } else {
                str += `<li><a href="#">...</a></li>`;
            }
        }

        str += '<li>';
        str += '    <a href="#" aria-label="Next" class="nextPage">';
        str += '        <span aria-hidden="true">下一页</span>';
        str += '    </a>';
        str + '</li>';


        $("#pageNumberView").html(str);

    };


    let add0 = function (m) {
        return m < 10 ? '0' + m : m
    };

    // 时间戳变时间
    let timeToShowData = function (time) {
        var time = new Date(time);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + '/' + add0(m) + '/' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
    };


    // 加载警报
    let loadWarmRoomList = function (item) {
        let text = item.roomId == -9999 ? "暂无警报" : `${item?.addr}号房间发出报警`;
        let str = '';
        str += `<p class="warmp1">${text}</p>`;
        str += `<p class="warmp2">${timeToShowData(item?.time)}</p>`;

        $("#roomWarmShow").html(str);
    };

    // 模式按钮切换
    let modalTypeChange = function () {
        if (currentType == 1) {
            $("#modalTypeView").removeClass("rightBtnViewWarm").addClass("rightBtnView");
            $("#modalTypeView").find("span").removeClass("btnTextViewWarm").addClass("btnTextView");
            $("#modalTypeView").find("span").text("平常模式");
            $("#changeModalP2").text("负压模式");
        } else {
            $("#modalTypeView").removeClass("rightBtnView").addClass("rightBtnViewWarm");
            $("#modalTypeView").find("span").removeClass("btnTextView").addClass("btnTextViewWarm");
            $("#modalTypeView").find("span").text("负压模式");
            $("#changeModalP2").text("平常模式");
        }
    };


    // 大屏数据接口调用
    let getBigShow = function () {
        ajaxUtilGet(`${baseUrl}/roomlist`, (result) => {
            // 加载页面
            if (result.code == 0) {
                loadWindView(mockData.data.fanlist);

                loadBigRoomDataShow(mockData.data.out);

                loadItemRoom(mockData.data.roomlist);
            } else {
                if (isMock) {
                    loadWindView(mockData.data.fanlist);

                    loadBigRoomDataShow(mockData.data.out);

                    loadItemRoom(mockData.data.roomlist);
                }
            }

        }, (error) => {
            if (isMock) {
                loadWindView(mockData.data.fanlist);

                loadBigRoomDataShow(mockData.data.out);

                loadItemRoom(mockData.data.roomlist);
            }
        });
    };


    // 查报警记录表格
    let lookWarmRecord = function (roomId, pageNumber) {
        currentPageNumber = pageNumber;
        ajaxUtilGet(`${baseUrl}/alarmrecord?pageNo=${pageNumber}&pageSize=${pageSize}&roomId=${roomId}`, (result) => {
            // 加载页面
            if (result?.code == 0) {
                loadTableView(result?.data?.list);
                loadPageView(result?.data?.totalCount);
            } else {
                if (isMock) {
                    loadTableView(mockTableData?.data?.list);
                    loadPageView(mockTableData?.data?.totalCount);
                }
            }

        }, error => {
            if (isMock) {
                loadTableView(mockTableData?.data?.list);
                loadPageView(mockTableData?.data?.totalCount);
            }
        });
    };

    // 设置正常模式
    let setNormalType = function (isNormal, password, callBack) {
        ajaxUtilGet(`${baseUrl}/setNormal?isNormal=${isNormal}&pwd=${password}`, (result) => {
            // 加载页面
            if (result?.code == 0) {
                callBack(true);
            } else {
                alert(result?.message || "密码错误");
                callBack(false);
            }
        }, () => {
            callBack(false);
        });
    };

    // 修改密码
    let changePassword = function (pwd, newPwd, callBack) {
        ajaxUtilGet(`${baseUrl}/modifyPwd?pwd=${pwd}&newPwd=${newPwd}`, (result) => {
            // 加载页面
            if (result?.code == 0) {
                callBack(true);
            } else {
                alert(result?.message || "当前密码错误");
                callBack(false);
            }
        }, () => {
            callBack(false);
        });
    };

    // 立即加载大屏
    const setIntervalImmediately = function (func, interval) {
        func();
        return setInterval(func, interval);
    };

    // 初始化
    let init = function () {

        let timer = null;
        let timer1 = null;
        timer && clearInterval(timer);
        timer = setIntervalImmediately(getBigShow, 30000);


        let i = 0;
        loadWarmRoomList(warmRoomList[i]);
        timer1 && clearInterval(timer1);
        timer1 = setInterval(function () {
            i = i + 1;
            if (i >= warmRoomList.length) {
                i = 0;
            }
            loadWarmRoomList(warmRoomList[i]);
        }, 2000);

    };

    init();

    // 切换模式按钮点击
    $(".changeModalBtn").click(function () {
        let value = $("#changeInputValue").val();
        if (value.length == 0) return;
        let newType = currentType == 1 ? 0 : 1;
        setNormalType(newType, value, (rel) => {
            if (rel) {
                currentType = newType;
                modalTypeChange();
                $("#changeModal").modal('hide');
            } else {
                if (isMock) {
                    currentType = newType;
                    modalTypeChange();
                    $("#changeModal").modal('hide');
                }

            }
        });

    });

    // 点击修改密码
    $(".changePasswordModalBtn").click(function () {
        let pwd = $("#changePwdInput").val();
        let newPwd = $("#changeNewPwdInput").val();
        if (pwd.length == 0 || newPwd.length == 0) return;
        changePassword(pwd, newPwd, (rel) => {
            if (rel) {
                $("#changePasswordModal").modal('hide');
            } else {
                if (isMock) {
                    $("#changePasswordModal").modal('hide');
                }
            }
        });
    });

    // 点击查看报警记录
    $("#middleLeftView").click(function () {
        // 调用接口 roomId为0，pageNumber = 1;
        lookWarmRecord(0, 1);

        loadSelectView(roomList);

        // 设置select选中某个值
        $("#selectViewStyle").val("0");
    });

    // select更改事件
    $("#selectViewStyle").change(function () {
        let value = $("#selectViewStyle").val();
        lookWarmRecord(value, 1);
    });

    // 翻页点击事件
    $("#pageNumberView").on('click', "a", function () {
        let mclass = $(this).attr("class");
        let value = $(this).text();
        if (mclass == "prePage") { // 上一页
            if (currentPageNumber == 1) {
                return;
            } else {
                let newpage = currentPageNumber - 1;
                let roomId = $("#selectViewStyle").val();
                lookWarmRecord(roomId, newpage);
            }
        }

        if (mclass == "nextPage") { // 下一页
            if (currentPageNumber >= maxPageNumber) {
                return;
            } else {
                let newpage = currentPageNumber * 1 + 1;
                let roomId = $("#selectViewStyle").val();
                lookWarmRecord(roomId, newpage);
            }
        }

        if (mclass == "pageNumerLi") {
            let roomId = $("#selectViewStyle").val();
            lookWarmRecord(roomId, value);
        }

    });


})($);
