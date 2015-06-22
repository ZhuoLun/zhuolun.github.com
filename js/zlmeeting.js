 //App ID : lsrxlqwkwgwnoc2mqwbrffy5b7ybli9izd2gc3he5fzj1mnn
    //App Key : d5aourqsv5a4d1t3ouou1qhf5oxg61ltxvbri67nu964kpow
    //Master Key : ndt3e8gu25uez1wznf5ndoei1ds8hikj87fr7hco6c8xsemr

   // AV.initialize("lsrxlqwkwgwnoc2mqwbrffy5b7ybli9izd2gc3he5fzj1mnn", "d5aourqsv5a4d1t3ouou1qhf5oxg61ltxvbri67nu964kpow");

    // var TestObject = AV.Object.extend("TestObject");
    // var testObject = new TestObject();
    // testObject.save({foo: "bar",phone:'13811866468'}, {
    //   success: function(object) {
    //     alert("我C，终于 TM 搞好了...");
    //   }
    // });

    // var zlRmeetingroom = AV.Object.extend("ReserveMeetingRoom");
    // var ReserveMR = new zlRmeetingroom();
    // //ReserveMR.set("","");
    //  ReserveMR.save({"name":"wuyu",'phone':"13811866468"}, {
    //     success:function(data){
    //         console.log(data);
    //     },
    //     error:function(data){

    //     }
    // });
var Zl = ( function() {

    'use strict';

    function classReg( className ) {
      return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    var hasClass, addClass, removeClass, $info = $('.iNfo');

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
    }
    else {
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


    // toggle meeting
    var layoutZL = document.getElementById( 'LOUtZl' ),
        leftSide = layoutZL.querySelectorAll( 'article.intro > div.side-left' ),
        rightSide = layoutZL.querySelectorAll( 'article.intro > div.side-right' ),
        pageLeft = layoutZL.querySelectorAll( 'article.page-left' ),
        pageRight = layoutZL.querySelectorAll( 'article.page-right' ),
        eventtype = 'click';

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
        })

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


    }

    function reset() {
        zLsriptClass.remove( layoutZL, 'close-right' );
        zLsriptClass.remove( layoutZL, 'close-left' );
        zLsriptClass.remove( layoutZL, 'reset-layout' );

    }

   return {init:init};
})();