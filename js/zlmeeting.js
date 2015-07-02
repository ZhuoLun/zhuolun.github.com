
var Zl = ( function() {

    'use strict';
    
    var actionRoomPage = function(){

        var hasClass, addClass, removeClass;

        function classReg( className ) {
          return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
        }

        if ( 'classList' in document.documentElement ) {
              hasClass = function( elem, c ) {
                return elem.classList.contains( c );
              };
              addClass = function( elem, c ) {
                elem.classList.add( c );
              };
              removeClass = function( elem, c ) {
                elem.classList.remove( c );
              };
        }else {
              hasClass = function( elem, c ) {
                return classReg( c ).test( elem.className );
              };
              addClass = function( elem, c ) {
                if ( !hasClass( elem, c ) ) {
                  elem.className = elem.className + ' ' + c;
                }
              };
              removeClass = function( elem, c ) {
                elem.className = elem.className.replace( classReg( c ), ' ' );
              };
        }

        function toggleClass( elem, c ) {
              var fn = hasClass( elem, c ) ? removeClass : addClass;
              fn( elem, c );
        }

        var zLsriptClass = {
              hasClass: hasClass,
              addClass: addClass,
              removeClass: removeClass,
              toggleClass: toggleClass,
              has: hasClass,
              add: addClass,
              remove: removeClass,
              toggle: toggleClass
        };

        if ( typeof define === 'function' && define.amd ) {
            define( zLsriptClass );
        } else {
            window.zLsriptClass = zLsriptClass;
        }

         // toggle meeting
        var layoutZL = document.getElementById( 'LOUtZl' ),
            leftSide = layoutZL.querySelectorAll( 'article.intro > div.side-left' ),
            rightSide = layoutZL.querySelectorAll( 'article.intro > div.side-right' ),
            pageLeft = layoutZL.querySelectorAll( 'article.page-left' ),
            pageRight = layoutZL.querySelectorAll( 'article.page-right' ),
            eventtype = 'click';

            zLsriptClass.add( layoutZL, 'reset-layout' );
            zLsriptClass.add( layoutZL, 'S-zl' );

            $(leftSide).each(function(index){
                this.querySelector( 'figure.intro-content' ).addEventListener( eventtype, function( wuyu ) {
                    init_SzlRoom();
                    zLsriptClass.add( layoutZL, 'open-left' );
                    zLsriptClass.remove( layoutZL, 'S-zl' );
                    if(index === 1){
                        leftSide[0].style.display = 'none';
                        $(leftSide[1]).addClass('Itsm');
                    }else{
                        $(leftSide[1]).removeClass('Itsm');
                        leftSide[0].style.display = 'block';
                    }
                    pageLeft[index].style.display = 'block';
                    pageLeft[Math.abs(1 - index)].style.display = 'none';
                } );
            });

            $(rightSide).each(function(index){
                this.querySelector('figure.intro-content').addEventListener( eventtype, function( wuyu ) {
                    init_SzlRoom();
                    zLsriptClass.add( layoutZL, 'open-right' );
                    zLsriptClass.remove( layoutZL, 'S-zl' );
                    if(index === 1){
                        rightSide[0].style.display = 'none';
                        $(rightSide[1]).addClass('Itsm');
                    }else{
                        //$(rightSide[1]).removeClass('Itsm');
                        rightSide[1].style.display = 'none';
                    }
                    pageRight[index].style.display = 'block';
                    pageRight[Math.abs(1 - index)].style.display = 'none';
                });
            });

            // back to meeting-room
            var backtoMeetingRoom = function( ev ) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    var dir = zLsriptClass.has( ev.target, 'bR' ) ? 'left' : 'right',
                        page = dir === 'right' ? pageRight : pageLeft;
                    zLsriptClass.remove( layoutZL, 'open-' + dir );
                    zLsriptClass.add( layoutZL, 'close-' + dir );
                    zLsriptClass.add( layoutZL, 'S-zl' );
                    $(layoutZL).find('.side').show();
                    $('#newr > b').text('').parent().hide();
                };

            layoutZL.querySelector( 'a.bL' ).addEventListener( eventtype, backtoMeetingRoom );
            layoutZL.querySelector( 'a.bR' ).addEventListener( eventtype, backtoMeetingRoom );

            function init_SzlRoom(){
                zLsriptClass.remove( layoutZL, 'close-right' );
                zLsriptClass.remove( layoutZL, 'close-left' );
                zLsriptClass.remove( layoutZL, 'reset-layout' );
            }

    }


    var Lean = function(){
        
        //App ID : lsrxlqwkwgwnoc2mqwbrffy5b7ybli9izd2gc3he5fzj1mnn
        //App Key : d5aourqsv5a4d1t3ouou1qhf5oxg61ltxvbri67nu964kpow
        //Master Key : ndt3e8gu25uez1wznf5ndoei1ds8hikj87fr7hco6c8xsemr

        AV.$ = jQuery;
        AV.initialize("lsrxlqwkwgwnoc2mqwbrffy5b7ybli9izd2gc3he5fzj1mnn", "d5aourqsv5a4d1t3ouou1qhf5oxg61ltxvbri67nu964kpow");

        var Room109 = AV.Object.extend("Room109"),
            Room111 = AV.Object.extend("Room111"),
            Room119 = AV.Object.extend("Room119"),
            Room120 = AV.Object.extend("Room120"),
            Query109 = new AV.Query(Room109),
            Query111 = new AV.Query(Room111),
            Query119 = new AV.Query(Room119),
            Query120 = new AV.Query(Room120),
            room109 = new Room109(),
            room111 = new Room111(),
            room119 = new Room119(),
            room120 = new Room120(),
            container = $('.meeting-list > ul'),
            modH = function(Po,DatE,sDate,eDate,status,nameU,nameu,nameTitle,desc,remarks){
                var sXs,html,Btn;

                if( !Po ) {
                    status == '紧急' ? sXs = 'hlevel">紧急' :  sXs = '">随意';
                    status == '过期' ? sXs = 'history">过期' :  sXs = '">随意';
                    Btn = '<a href="javascript:void(0);" class="tempEdit">修改</a>';

                }else{
                    sXs = 'novalue">' + status;
                    Btn = '<input type="button" value="提交预定" class="btnpost"/>';
                }

                html = '<li class="infoLi '+ Po +'"><time class="tmt" ><span class="dateMeeting"><input type="text" placeholder="开会日期" class="date-M" maxlength="6" value="'+ DatE +'"/><div class="showTangeTime">当天暂无预定信息</div></span><span class="timerangeMeeting"><input type="text" placeholder="开始时间" maxlength="6" value="'+ sDate +'" class="range-S"/> ~ <input type="text" class="range-E" value="'+ eDate +'" maxlength="6" placeholder="结束时间"/></span></time><div class="select-status"><div class="hlevel">紧急</div><div class="">随意</div></div><div class="tmt-status '+ sXs +'</div><div class="content f"><h2 class="sor"><label>会议发起人 ：</label><input type="text" maxlength="3" placeholder="请输入发起人的真实姓名" value="'+ nameU +'" class="tX nameU"/></h2><h2><label>参会人员 ：</label><input type="text" placeholder="请输入参会人员的真实姓名，逗号隔开" class="tX nameu" value="'+ nameu +'"/></h2><h2><label>会议主题 ：</label><input type="text" placeholder="请输入此次会议的主题" class="tX nameTitle" value="'+ nameTitle +'"/></h2><h2><label >摘要 (选填)：</label><input type="text" placeholder="请输入此次会议的摘要" class="tX desc" value="'+ desc +'"/></h2><h2><label class="additional">附加 (选填)：</label><textarea placeholder="此处可以填写本次会议的备注或者特别说明..." class="tX remarks" value="'+ remarks +'"></textarea></h2>'+ Btn +'<div style="clear:both;"></div></div></li>';
                return html;
            };

        function art(e,d,Con){

            var $NoticeText = $('#NEW' + e), 
                $contain = $('.lMEet' + e ).parents('.page'), 
                $zLss, Ginput, $EditT, $tg, $TG, Ix, 
                $U, $u, $le, $sc, $ks;

            function Process_zl(g,w){
                    $zLss = $contain.find('.infoLi.false'), Ginput = $zLss.find('.content input,textarea');
                    $zLss.find('.date-M,.range-S,.range-E,input,textarea').attr({'readOnly':true,'disabled':true});
                    $zLss.find('.select-status').hide();
                    $zLss.find('.tmt-status').css('cursor','default');
                    Ginput.addClass('zl-in');

                    $contain.on('click','a.tempEdit', function(){
                        var $this = $(this);
                        $this.text('提交更改').addClass('up-date').parent().find('input,textarea').removeClass('zl-in').removeAttr('readOnly disabled');
                    });

                    $contain.on('click','[class$="false"] a.tempEdit.up-date', function(){
                        $tg = $(this).parents('.infoLi.false'), 
                        $TG = $tg.parent().find('.infoLi.false'), Ix = g[$TG.index($tg)],
                        $U = $tg.find('.nameU').val().trim().toString(),
                        $u = $tg.find('.nameu').val().trim().toString(),
                        $le = $tg.find('.nameTitle').val().trim().toString(),
                        $sc = $tg.find('.desc').val().trim().toString(),
                        $ks = $tg.find('.remarks').val().trim().toString();
                        if( $U == '' ){
                            alert('会议发起人姓名不允许为空');
                            return false;
                        }else if( !/^[\u4e00-\u9fa5]/.test($tg.find('.nameU').val().trim()) ){
                            alert('会议发起人姓名只允许使用汉字(或者汉字开头)！');
                            return false;
                        }else if( $u == '' ){
                            alert('参会人员姓名不允许为空');
                            return false;
                        }else if( $le == '' ){
                            alert('会议主题不允许为空');
                            return false;
                        }else{

                            //if( Ix.id == 'undefined' ){ alert(JSON.stringify(Ix)) }
                            w.get( Ix.id ,{
                                success:function(ZL){
                                    ZL.set('who_initiate_meeting', $U);
                                    ZL.set('who_join_meeting', $u);
                                    ZL.set('Title_meeting', $le);
                                    ZL.set('desc_meeting', $sc);
                                    ZL.set('attach_meeting', $ks);
                                    ZL.save();
                                    if( $tg.prev().hasClass('true') ){
                                        var text = $NoticeText.text(),
                                            t = text.substr(0,text.indexOf('·') + 1);
                                        $NoticeText.text(t +' '+ $U);
                                    }
                                },
                                error:function(error){
                                    alert("错误提示: " + error.code + "-" + error.message);
                                }
                            });
                            $(this).removeClass('up-date').text('修改').parent().find('input,textarea').addClass('zl-in').attr({'readOnly':true,'disabled':true});
                        }

                    });
            }

            $('#NO' + e).on('click',':button',function(){
        
                var btnReserve = $(this),
                    DA = new Date(),
                    $L = btnReserve.parents('.infoLi'),
                    dateMeeting = $L.find('.date-M'),
                    timerangeMeeting_s = $L.find('.timerangeMeeting .range-S'),
                    timerangeMeeting_e = $L.find('.timerangeMeeting .range-E'),
                    tmt_status = $L.find('.tmt-status'),
                    nameU = $L.find('.nameU'),
                    nameu = $L.find('.nameu'),
                    nameTitle = $L.find('.nameTitle'),
                    desc = $L.find('.desc'),
                    remarks = $L.find('.remarks'),
                    $isE = $('.lMEet' + e ),
                    Json = {time:new Date().getTime()},
                    url = window.location.href,
                    datE_G = parseInt(dateMeeting.val().trim().replace(/[^0-9]/ig,"")),
                    datE_T = parseInt( timerangeMeeting_s.val().trim().replace(/[^0-9]/ig,"")  ),
                    datE_N = parseInt( ( DA.getMonth() + 1 ) + '' + ( DA.getDate()<10?'0' + DA.getDate():DA.getDate())),
                    datE_t = parseInt(DA.getHours() + '' + DA.getMinutes()),
                    order_byTime = datE_G + '' + ( datE_T.length < 4?'0'+datE_T:datE_T );


                if( dateMeeting.val().trim() == '' ){
                    alert('开会日期不能为空');
                    return false;
                }else if( datE_G < datE_N || datE_N === datE_G && datE_T <= datE_t  ){
                    alert('What are you 弄啥勒？预定日期已经成为了过去...');
                    return false;
                }else if( timerangeMeeting_s.val().trim() == '' || timerangeMeeting_e.val().trim() == '' ){
                    alert('会议具体时间段不能为空{开始时间~结束时间}');
                    return false;
                }else if( parseInt(timerangeMeeting_s.val().replace(/[^0-9]/ig,"")) > parseInt(timerangeMeeting_e.val().replace(/[^0-9]/ig,"")) ){
                    alert('开始时间必须小于结束时间');
                    return false;
                }else if( tmt_status.hasClass('novalue') ){
                    alert('请选择会议状态 ( 随意,代表该会议可调换【时间/地点/XXX】;紧急,代表不希望被调换【时间/地点/XXX】)');
                    return false;
                }else if( nameU.val().trim() == '' ){
                    alert('会议发起人姓名不允许为空');
                    return false;
                }else if( !/^[\u4e00-\u9fa5]/.test(nameU.val().trim()) ){
                    alert('会议发起人姓名只允许使用汉字(或者汉字开头)！');
                    return false;
                }else if( nameu.val().trim() == '' ){
                    alert('参会人员姓名不允许为空');
                    return false;
                }else if( nameTitle.val().trim() == '' ){
                    alert('会议主题不允许为空');
                    return false;
                }else{
                    
                    d.save({ order_date:order_byTime, date_meeting: dateMeeting.val().trim().toString() , S_time_range_Meeting : timerangeMeeting_s.val().trim().toString() ,
                        E_time_range_Meeting : timerangeMeeting_e.val().trim().toString() ,
                        status_meeting : tmt_status.text().toString(),
                        who_initiate_meeting : nameU.val().trim().toString(),
                        who_join_meeting : nameu.val().trim().toString(),
                        Title_meeting: nameTitle.val().trim().toString(),
                        desc_meeting: desc.val().trim().toString(),
                        attach_meeting: remarks.val().trim().toString() },{
                        success:function(Zl_s_iD){
                            var zL = Zl_s_iD,
                                lpo, Ginput, D = zL.get('date_meeting'),
                                S = zL.get('S_time_range_Meeting'),
                                E = zL.get('E_time_range_Meeting'),
                                St = zL.get('status_meeting'),
                                I = zL.get('who_initiate_meeting'),
                                J = zL.get('who_join_meeting'),
                                T = zL.get('Title_meeting'),
                                d = zL.get('desc_meeting'),
                                a = zL.get('attach_meeting');
                            

                            // if( $isE.find('li.false').length > 0 ){
                            //     $('.lMEet' + e ).find('li.false:first').before(modH(false,D,S,E,St,I,J,T,d,a));
                            // }else{
                            //     $('.lMEet' + e ).find('li.true').after(modH(false,D,S,E,St,I,J,T,d,a));
                            // }

                            $isE.find('li.true').after(modH(false,D,S,E,St,I,J,T,d,a));

                            Con.find({success:function(wuyu){
                                Process_zl(wuyu,Con);
                            }});

                            $NoticeText.addClass('booked').text('最新预定：'+ D +'{ '+ S +' ~ '+ E +' }· ' + I);

                            dateMeeting.val(''); timerangeMeeting_s.val(''); timerangeMeeting_e.val(''); tmt_status.text(''); nameU.val(''); nameu.val(''); nameTitle.val(''); desc.val(''); remarks.val('');

                            alert('预定会议室成功 :)');
                            window.history.pushState(Json,"",url+'?'+e+'!'+I);
                            window.location = location;
                          },
                          error:function(data,error){
                            alert('预定会议室失败 *_* >>> '+ error.code + '-' + error.message);
                            return false;
                          }
                    });


                }
            });

        Con.descending("order_date");

        Con.find({
            success:function(Cou){

                var count = Cou[0],
                    CCl = Cou.length,
                    Z_order = count.get('order_date'),
                    Z_date_l = count.get('date_meeting'),
                    Z_st_l = count.get('S_time_range_Meeting'),
                    Z_et_l = count.get('E_time_range_Meeting'),
                    Z_boss_l = count.get('who_initiate_meeting');

                count.id == '' || typeof count.id == 'undefined' ? $NoticeText.removeClass('booked').text('暂无预定') : $NoticeText.addClass('booked').text('最新预定：'+ Z_date_l +'{ '+ Z_st_l +' ~ '+ Z_et_l +' }· ' + Z_boss_l);

                for( var i = 0; i < CCl; i++ ){
                    var Ci = Cou[i],
                        DA = new Date(),
                        Dt = Ci.get('date_meeting'),
                        Sd = Ci.get('S_time_range_Meeting'),
                        Ed = Ci.get('E_time_range_Meeting'),
                        Su = Ci.get('status_meeting'),
                        Ip = Ci.get('who_initiate_meeting'),
                        Jp = Ci.get('who_join_meeting'),
                        Tm = Ci.get('Title_meeting'),
                        dt = Ci.get('desc_meeting'),
                        at = Ci.get('attach_meeting'),
                        datE_gg = parseInt(Dt.replace(/[^0-9]/ig,"")),
                        datE_tt = parseInt(Sd.replace(/[^0-9]/ig,"")),
                        datE_N = parseInt( ( DA.getMonth() + 1 ) + '' + ( DA.getDate()<10?'0' + DA.getDate():DA.getDate())),
                        datE_t = parseInt(DA.getHours() + '' + DA.getMinutes());

                        if( datE_gg < datE_N || datE_N === datE_gg && datE_tt <= datE_t ){
                            $('.lMEet' + e).append(modH(false,Dt,Sd,Ed,'过期',Ip,Jp,Tm,dt,at));
                        }else{
                            $('.lMEet' + e).append(modH(false,Dt,Sd,Ed,Su,Ip,Jp,Tm,dt,at));
                        }

                        $('.infoLi').each(function(){
                            
                           $(this).find('.select-status + div').hasClass('history') == true ? $(this).find('.tempEdit').hide() : false ;
                        });

                }

                Process_zl(Cou,Con);

            },
            error:function(error){
                //if(error.code == -1){
                    //container.append(modH(true,'','','','选择状态','','','','',''));
                   // return false;
               // }
                console.log("错误提示: " + error.code + "-" + error.message);
            }
        });
       
       
        
        $('.lMEet' + e ).find('.date-M').keyup(function(event) {
            var $this = $(this), wL = $this.val().length, oG, reP = Con.toString().replace('R','r'), Ck = $this.next('div'), Cql = 'select count(*),* from Room'+ e +' where date_meeting LIKE ?';

            if( wL >= 5 ){
                oG = $this.val().trim();
                Ck.fadeIn();
                Ck.click(function(event){ Ck.hide();  });
                AV.Query.doCloudQuery( Cql , [oG] ,{
                    success:function(result){
                        var Trt = result.results, count = result.count, _L = Trt.length,u = [];
                        
                        u.push('该日期目前已有'+ count +'个预定了');

                        for(var o = 0; o < _L; o++){
                            var St = Trt[o].get('S_time_range_Meeting'),
                                Et = Trt[o].get('E_time_range_Meeting');
                                u.push('<span>' + St + '~' + Et + ',</span>');
                        }

                        Ck.empty().append(u);


                    },
                    error:function(error){
                        console.log("错误提示: " + error.code + "-" + error.message);
                    }
                });


               

            }

        });

    }
        
        container.append(modH(true, (Zl.dd.Mon < 10 ?'0'+ Zl.dd.Mon:Zl.dd.Mon) + '月' + (Zl.dd.Day < 10 ?'0'+ Zl.dd.Day:Zl.dd.Day)  + '日', (Zl.dd.Hou < 10 ?'0'+ Zl.dd.Hou:Zl.dd.Hou) + ':' + (Zl.dd.Min < 10 ?'0'+ Zl.dd.Min:Zl.dd.Min ), parseInt((Zl.dd.Hou < 10 ?'0'+ parseInt(Zl.dd.Hou + 2) : Zl.dd.Hou + 2 )) +': 00', '选择状态','','','','',''));

        art(109,room109,Query109);
        art(111,room111,Query111);
        art(119,room119,Query119);
        art(120,room120,Query120);
       
    }

    var DatX = function(){
        
        (function getime(){
            var date = new Date(),
                NowTime = $('.NowTime'),
                year = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate(),
                hours = date.getHours(),
                minutes = date.getMinutes(),
                seconds = date.getSeconds(),
                week = date.getDay(),
                warr = ['周日','周一','周二','周三','周四','周五','周六'],
                StrDate = year + '年';
                if( month < 10 )
                StrDate += '0';
                StrDate += month + '月';
                if( day < 10 )
                StrDate += '0';
                StrDate += day + '日';
                StrDate += hours > 12 ? ' 下午 ' : ' 上午 ';
                StrDate += (hours < 10) ? '0' + hours : hours;
                StrDate += ((minutes < 10) ? ":0" : ":") + minutes;
                StrDate += ((seconds < 10) ? ":0" : ":") + seconds;
                StrDate += ' [' + warr[week] + '] ';
                NowTime.text(StrDate);
                setTimeout(getime,1000);
                window.Hou_ = hours;
                window.Dat_ = month;
                window.Mon_ = day;
                window.Min_ = minutes;

        }).call(this);
       
        window.Hou = Hou_;
        window.Mon = Dat_;
        window.Day = Mon_;
        window.Min = Min_;
        
        return { Hou:Hou, Mon:Mon, Day:Day, Min:Min };
    }

    var init = function(){

        var $info = $('.iNfo'),
            $WuYu = $('.meeting-list > ul'), 
            ua = window.navigator.userAgent.toLowerCase().indexOf('chrome'), 
            Width = window.screen.width, uri = window.location.search.slice(1), 
            sTr = uri.split('!'), $notice = $('#newr').show().find('b');

        if( ua < 0 ){
           alert('目前为测试版本，请使用chrome浏览器~');
           $('body').html('目前为beta版本，请使用chrome浏览器。无语， 哦，无语，哦，不。哦，好吧... ');
           return false;
        }

        if( Width <= 1366 ) {  $WuYu.addClass('sMall'); }

        if( uri.length > 0 ){
             $notice.text("  { 会议室 : "+ sTr[0] +" , 发起人 : "+ decodeURI(sTr[1]) +" }");
        }else{ 
            $notice.parent().hide();
        }

        $info.on('click', 'button',function(){
            $('.mask-zl').addClass('gomask');
            setTimeout(function(){ $('.mask-zl').hide(); },501);
            $info.addClass('goscale');
            var r = window.location.href.indexOf('?');
            window.history.pushState(null, "Zl-S individuation", window.location.href.substr(0,r));
        });


        $WuYu.on({
            focus:function(){
                $(this).parent().addClass('showN');
            },
            blur:function(){
                $(this).parent().removeClass('showN');
            }
        },'.tX');

        $WuYu.on('mouseover','.tmt-status',function(sel){
            var $this = $(this),
                act = $this.prev(), words;

                act.children().addClass('sHua');
                act.on('click','div',function(el){
                words = this.innerText;
                words == '紧急' ? $this.removeClass('novalue').addClass('hlevel').text(words): $this.removeClass('novalue hlevel').text(words);
                act.children().removeClass('sHua');
            });
        });

        Lean();
        DatX();
        actionRoomPage();

    }


   return {init:init,dd:DatX()};
})();