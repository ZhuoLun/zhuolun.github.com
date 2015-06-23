
var Zl = ( function() {

    'use strict';

    function classReg( className ) {
      return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    var hasClass, addClass, removeClass, $info = $('.iNfo'), $tX = $('.tX'), $tmt_status = $('.tmt-status');

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

    $info.on('click', 'button',function(){
        $('.mask-zl').addClass('gomask');
        setTimeout(function(){ $('.mask-zl').hide(); },501);
        $info.addClass('goscale');
    });

    $tX.on({
        focus:function(){ 
            $(this).parent().addClass('showN');
        },
        blur:function(){
            $(this).parent().removeClass('showN');
        }
    });

    $tmt_status.hover(function(sel){
        var $this = $(this),
            act = $this.prev();
        act.children().addClass('sHua');
        act.on('click','div',function(el){
            var words = this.innerText;
            words == '紧急' ? $this.removeClass('novalue').addClass('hlevel').text(words): $this.removeClass('novalue hlevel').text(words);
            act.children().removeClass('sHua');
        });
    });


    // toggle meeting
    var layoutZL = document.getElementById( 'LOUtZl' ),
        leftSide = layoutZL.querySelectorAll( 'article.intro > div.side-left' ),
        rightSide = layoutZL.querySelectorAll( 'article.intro > div.side-right' ),
        pageLeft = layoutZL.querySelectorAll( 'article.page-left' ),
        pageRight = layoutZL.querySelectorAll( 'article.page-right' ),
        eventtype = 'click', Lean, DatX;

    function init() {
        zLsriptClass.add( layoutZL, 'reset-layout' );
        zLsriptClass.add( layoutZL, 'S-zl' );
        $(leftSide).each(function(index){
            $(this).get(0).querySelector( 'figure.intro-content' ).addEventListener( eventtype, function( ev ) {
                reset();
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
            $(this).get(0).querySelector('figure.intro-content').addEventListener( eventtype, function( ev ) {
                reset();
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
        var backToIntro = function( ev ) {
                ev.preventDefault();
                ev.stopPropagation();
                var dir = zLsriptClass.has( ev.target, 'bR' ) ? 'left' : 'right',
                    page = dir === 'right' ? pageRight : pageLeft;
                zLsriptClass.remove( layoutZL, 'open-' + dir );
                zLsriptClass.add( layoutZL, 'close-' + dir );
                zLsriptClass.add( layoutZL, 'S-zl' );
                $(layoutZL).find('.side').show();
            };

        layoutZL.querySelector( 'a.bL' ).addEventListener( eventtype, backToIntro );
        layoutZL.querySelector( 'a.bR' ).addEventListener( eventtype, backToIntro );
        Lean(); DatX();

    }

    function reset() {
        zLsriptClass.remove( layoutZL, 'close-right' );
        zLsriptClass.remove( layoutZL, 'close-left' );
        zLsriptClass.remove( layoutZL, 'reset-layout' );

    }

    Lean = function(){

        //App ID : lsrxlqwkwgwnoc2mqwbrffy5b7ybli9izd2gc3he5fzj1mnn
        //App Key : d5aourqsv5a4d1t3ouou1qhf5oxg61ltxvbri67nu964kpow
        //Master Key : ndt3e8gu25uez1wznf5ndoei1ds8hikj87fr7hco6c8xsemr

        AV.$ = jQuery;
        AV.initialize("lsrxlqwkwgwnoc2mqwbrffy5b7ybli9izd2gc3he5fzj1mnn", "d5aourqsv5a4d1t3ouou1qhf5oxg61ltxvbri67nu964kpow");

        var Room109 = AV.Object.extend("Room109"),
            Room111 = AV.Object.extend("Room111"),
            Room119 = AV.Object.extend("Room119"),
            Room120 = AV.Object.extend("Room120"),
            room109 = new Room109(),
            room111 = new Room111(),
            room119 = new Room119(),
            room120 = new Room120();

        var btnReserve = $('.btnpost'), 
            dateMeeting = btnReserve.parents('.infoLi').find('.dateMeeting'),
            timerangeMeeting = btnReserve.parents('.infoLi').find('.timerangeMeeting'), 
            tmt_status = btnReserve.parents('.infoLi').find('.tmt-status'), 
            nameU = btnReserve.parents('.infoLi').find('.nameU'),
            nameu = btnReserve.parents('.infoLi').find('.nameu'), 
            nameTitle = btnReserve.parents('.infoLi').find('.nameTitle'),
            desc = btnReserve.parents('.infoLi').find('.desc'), 
            remarks = btnReserve.parents('.infoLi').find('.remarks');

        function art(e,d){
            $('#NO' + e).on('click',':button',function(){
                if( nameU.val().trim() == '' ){
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
                    d.save({ date_meeting: dateMeeting.text().toString() , time_range_Meeting : timerangeMeeting.text().toString() , status_meeting : tmt_status.text().toString(), who_initiate_meeting : nameU.val().trim().toString(), who_join_meeting : nameu.val().trim().toString(), Title_meeting:nameTitle.val().trim().toString(), desc_meeting:desc.val().trim().toString(), attach_meeting:remarks.val().trim().toString() },{
                          success:function(){
                            alert('预定成功');
                            return false;
                          },
                          error:function(){
                            alert('预定失败');
                            return false;
                          }
                    });
                }


                 
            });
        }

        art(109,room109);

        
    }

    DatX = function(){
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