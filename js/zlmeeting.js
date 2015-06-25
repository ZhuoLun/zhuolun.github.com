
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
                };

            layoutZL.querySelector( 'a.bL' ).addEventListener( eventtype, backtoMeetingRoom );
            layoutZL.querySelector( 'a.bR' ).addEventListener( eventtype, backtoMeetingRoom );

            function init_SzlRoom(){
                zLsriptClass.remove( layoutZL, 'close-right' );
                zLsriptClass.remove( layoutZL, 'close-left' );
                zLsriptClass.remove( layoutZL, 'reset-layout' );
            }

    }

    var init = function(){

        var $info = $('.iNfo'), $WuYu = $('.meeting-list > ul'), ua = window.navigator.userAgent.toLowerCase().indexOf('chrome'), Width = window.screen.width;

        if( ua < 0){
           alert('目前为beta版本，请使用chrome浏览器。'); 
           $('body').html('目前为beta版本，请使用chrome浏览器。无语， 哦，无语，哦，不。哦，好吧... ');
           return false;
        }
        
        if( Width <= 1366 ) $('.tmt').css('left','-22px');

        $info.on('click', 'button',function(){
            $('.mask-zl').addClass('gomask');
            setTimeout(function(){ $('.mask-zl').hide(); },501);
            $info.addClass('goscale');
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
                act = $this.prev();
            act.children().addClass('sHua');
            act.on('click','div',function(el){
                var words = this.innerText;
                words == '紧急' ? $this.removeClass('novalue').addClass('hlevel').text(words): $this.removeClass('novalue hlevel').text(words);
                act.children().removeClass('sHua');
            });
        });

        Lean(); 
        DatX(); 
        actionRoomPage(); 
 
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
                    Btn = '<a href="javascript:void(0);" class="tempEdit">修改</a>';
                }else{ 
                    sXs = 'novalue">' + status; 
                    Btn = '<input type="button" value="提交预定" class="btnpost"/>';
                }

                html = '<li class="infoLi '+ Po +'"><time class="tmt" ><span class="dateMeeting"><input type="text" placeholder="开会日期" class="date-M" maxlength="6" value="'+ DatE +'"/></span><span class="timerangeMeeting"><input type="text" placeholder="开始时间" maxlength="5" value="'+ sDate +'" class="range-S"/> ~ <input type="text" class="range-E" value="'+ eDate +'" maxlength="5" placeholder="结束时间"/></span></time><div class="select-status"><div class="hlevel">紧急</div><div class="">随意</div></div><div class="tmt-status '+ sXs +'</div><div class="content f"><h2 class="sor"><label>会议发起人 ：</label><input type="text" maxlength="3" placeholder="请输入发起人的真实姓名" value="'+ nameU +'" class="tX nameU"/></h2><h2><label>参会人员 ：</label><input type="text" placeholder="请输入参会人员的真实姓名，逗号隔开" class="tX nameu" value="'+ nameu +'"/></h2><h2><label>会议主题 ：</label><input type="text" placeholder="请输入此次会议的主题" class="tX nameTitle" value="'+ nameTitle +'"/></h2><h2><label >摘要 (选填)：</label><input type="text" placeholder="请输入此次会议的摘要" class="tX desc" value="'+ desc +'"/></h2><h2><label class="additional">附加 (选填)：</label><textarea placeholder="此处可以填写本次会议的备注或者特别说明..." class="tX remarks" value="'+ remarks +'"></textarea></h2>'+ Btn +'<div style="clear:both;"></div></div></li>';
                return html;
            };

        function art(e,d){
            $('#NO' + e).on('click',':button',function(){

                var btnReserve = $(this),
                    $L = btnReserve.parents('.infoLi'),
                    dateMeeting = $L.find('.date-M'),
                    timerangeMeeting_s = $L.find('.timerangeMeeting .range-S'),
                    timerangeMeeting_e = $L.find('.timerangeMeeting .range-E'), 
                    tmt_status = $L.find('.tmt-status'), 
                    nameU = $L.find('.nameU'),
                    nameu = $L.find('.nameu'), 
                    nameTitle = $L.find('.nameTitle'),
                    desc = $L.find('.desc'), 
                    remarks = $L.find('.remarks');

                if( dateMeeting.val().trim() == '' ){
                    alert('开会日期不能为空');
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
                    alert('会议发起人姓名只允许使用汉字！');
                    return false;
                }else if( nameu.val().trim() == '' ){
                    alert('参会人员姓名不允许为空');
                    return false;
                }else if( nameTitle.val().trim() == '' ){
                    alert('会议主题不允许为空');
                    return false;
                }else{

                    d.save({ date_meeting: dateMeeting.val().trim().toString() , S_time_range_Meeting : timerangeMeeting_s.val().trim().toString() ,
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
                            $('.lMEet' + e ).find('li:first').after(modH(false,D,S,E,St,I,J,T,d,a));

                            lpo = $('.lMEet' + e ).find('.infoLi.false'), Ginput = lpo.find('.content input,textarea');
                            lpo.find('.date-M,.range-S,.range-E,input,textarea').attr({'readOnly':true,'disabled':true});
                            lpo.find('.select-status').hide();
                            lpo.find('.tmt-status').css('cursor','default');
                            Ginput.addClass('zl-in');
                            alert('预定会议室成功 :)');
                            return false;
                          },
                          error:function(data,error){
                            alert('预定会议室失败 *_* >>> '+ error.code + '-' + error.message);
                            return false;
                          }
                    });
                

                }
            });
        }

        container.append(modH(true,'','','','选择状态','','','','',''));

        function Q_Q(id,Con){
            Con.descending('createdAt');
            Con.find({
                success:function(Cou){
                    var count = Cou[0],
                        CCl = Cou.length,
                        Z_date_l = count.get('date_meeting'),
                        Z_st_l = count.get('S_time_range_Meeting'),
                        Z_et_l = count.get('E_time_range_Meeting'),
                        Z_boss_l = count.get('who_initiate_meeting'),
                        $NoticeText = $('#NEW' + id),
                        $contain = $('.lMEet'+id),
                        $zLss,Ginput,$EditT,$tg,$TG,Ix,$U,$u,$le,$sc,$ks;

                    count.id == '' || typeof count.id == 'undefined' ? $NoticeText.removeClass('booked').text('暂无预定') : $NoticeText.addClass('booked').text('最新预定：'+ Z_date_l +'{ '+ Z_st_l +' ~ '+ Z_et_l +' }· ' + Z_boss_l);

                    for(var i = 0; i < CCl; i++ ){
                        var Ci = Cou[i],
                            Dt = Ci.get('date_meeting'),
                            Sd = Ci.get('S_time_range_Meeting'),
                            Ed = Ci.get('E_time_range_Meeting'),
                            Su = Ci.get('status_meeting'),
                            Ip = Ci.get('who_initiate_meeting'),
                            Jp = Ci.get('who_join_meeting'),
                            Tm = Ci.get('Title_meeting'),
                            dt = Ci.get('desc_meeting'),
                            at = Ci.get('attach_meeting');
                            container.append(modH(false,Dt,Sd,Ed,Su,Ip,Jp,Tm,dt,at));
                    }

                    $zLss = $contain.find('.infoLi.false'), Ginput = $zLss.find('.content input,textarea');
                    $zLss.find('.date-M,.range-S,.range-E,input,textarea').attr({'readOnly':true,'disabled':true});
                    $zLss.find('.select-status').hide();
                    $zLss.find('.tmt-status').css('cursor','default');
                    Ginput.addClass('zl-in');

                    $contain.on('click','a.tempEdit', function(){
                        var $this = $(this);
                        $this.text('提交更改').addClass('up-date').parent().find('input,textarea').removeClass('zl-in').removeAttr('readOnly disabled');
                    });

                    $contain.on('click','a.tempEdit.up-date', function(){
                        $tg = $(this).parents('.infoLi.false'), $TG = $tg.parent().find('.infoLi.false'),Ix = Cou[$TG.index($tg)],
                        $U = $tg.find('.nameU').val().trim().toString(),
                        $u = $tg.find('.nameu').val().trim().toString(), 
                        $le = $tg.find('.nameTitle').val().trim().toString(),
                        $sc = $tg.find('.desc').val().trim().toString(), 
                        $ks = $tg.find('.remarks').val().trim().toString();
                        Con.get( Ix.id ,{
                            success:function(ZL){
                                ZL.set('who_initiate_meeting', $U);
                                ZL.set('who_join_meeting', $u);
                                ZL.set('Title_meeting', $le);
                                ZL.set('desc_meeting', $sc);
                                ZL.set('attach_meeting', $ks);
                                ZL.save();
                            },
                            error:function(error){
                                alert("错误提示: " + error.code + "-" + error.message);
                            }
                        });
                        $(this).removeClass('up-date').text('修改').parent().find('input,textarea').addClass('zl-in').attr({'readOnly':true,'disabled':true});
                    });
                   
                },
                error:function(error){
                    alert("错误提示: " + error.code + "-" + error.message);
                }
            });
        }

        art(109,room109); art(111,room111); art(119,room119); art(120,room120);
        Q_Q(109,Query109); 
        //Q_Q(111,Query111); 
        //Q_Q(119,Query119); Q_Q(120,Query120);

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
                warr = ['周一','周二','周三','周四','周五','周六','周日'],
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
                StrDate += ' [' + warr[week - 1] + '] ';
                NowTime.text(StrDate);
                setTimeout(getime,1000);
        }).call(this);
    }

   return {init:init};
})();