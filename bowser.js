/*!
  * Bowser - a browser detector
  * https://github.com/ded/bowser
  * MIT License | (c) Dustin Diaz 2015
  */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(definition)
  else this[name] = definition()
}('bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  var browserNames = {
    silk: 'Amazon Silk',
    firefox: 'Firefox',
    seamonkey: 'SeaMonkey',
    sailfish: 'Sailfish',
    msedge: 'Microsoft Edge'
  };

  function getFirstMatch(ua, regex) {
    var match = ua.match(regex);
    return (match && match.length > 1 && match[1]) || '';
  }

  function getSecondMatch(ua, regex) {
    var match = ua.match(regex);
    return (match && match.length > 1 && match[2]) || '';
  }

  function getDeviceName(ua) {
    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase();
    return iosdevice;
  }

  function isIOS(deviceName) {
    return ['ipad', 'iphone', 'ipod'].indexOf(deviceName) > -1;
  }

  function getDeviceType(ua) {
    if (/tablet/i.test(ua)) {
      return 'tablet';
    } else if (/[^-]mobi/i.test(ua)) {
      return 'mobile';
    }
  }

  function getOSName(ua, deviceName, browserName) {
    if (/like android/i.test(ua)) {
      return 'likeAndroid';
    }
    else if (/android/i.test(ua)) {
      return 'android';
    }
    else if (/CrOS/.test(ua)) {
      return 'chromeos';
    }
    else if (/sailfish/i.test(ua)) {
      return 'sailfish';
    }
    else if (/tizen/i.test(ua)) {
      return 'tizen';
    }
    else if (/(web|hpw)os/i.test(ua)) {
      return 'webos';
    }
    else if (/windows phone/i.test(ua)) {
      return 'windowsphone';
    }
    // call non-windowsphone "windows"
    else if (/windows/i.test(ua)) {
      return 'windows';
    }
    else if (isIOS(deviceName)) {
      return 'ios';
    }
    else if (/macintosh/i.test(ua) && browserName !== 'silk') {
      return 'mac';
    }
    // non-desktop linux like android, sailfish, tizen, etc. will have returned
    // by now. use 'linux' to represent desktop (or unrecognized) linuxes.
    else if (/linux/.match(ua)) {
      return 'linux';
    }
  }


  function getOSVersion(ua) {
  }

  function getBrowserName(ua, osName) {
    if (/opera|opr/i.test(ua)) {
      return 'opera';
    }
    else if (/yabrowser/i.test(ua)) {
      return 'yabrowser';
    }
    else if (/msie|trident/i.test(ua)) {
      return 'msie';
    }
    else if (/firefox|iceweasel/i.test(ua)) {
      return 'firefox';
    }
    else if (/chrome.+? edge/i.test(ua)) {
      return 'msedge';
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      return 'chrome';
    }
    else if (/seamonkey\//i.test(ua)) {
      return 'seamonkey';
    }
    else if (/silk/i.test(ua)) {
      return 'silk';
    }
    else if (/yabrowser/i.test(ua)) {
      return 'yandexbrowser';
    }
    else if (/phantom/i.test(ua)) {
      return 'phantom';
    }
    else if (/sailfish/i.test(ua)) {
      return 'sailfish';
    }
    // the android stock browser. Chrome/Firefox for android contain 'android',
    // but will have returned above.
    else if (/android/i.test(ua)) {
      return 'android';
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      return 'blackberry';
    }
  }

  function getBrowserVersion(ua, browserName, osName) {
      var versionIdentifier = getFirstMatch(ua, /version\/(\d+(\.\d+)?)/i);

      if (browserName === 'opera') {
        return versionIdentifier || getFirstMatch(ua, /(?:opera|opr)[\s\/](\d+(\.\d+)?)/i);
      }
      else if (browserName === 'yandexbrowser') {
        return versionIdentifier || getFirstMatch(ua, /(?:yabrowser)[\s\/](\d+(\.\d+)?)/i);
      }
      else if (browserName === 'msie') {
        return getFirstMatch(ua, /(?:msie |rv:)(\d+(\.\d+)?)/i);
      }
      else if (browserName === 'chrome') {
        return getFirstMatch(ua, /(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i);
      }
      else if (browserName === 'msedge') {
        return getFirstMatch(ua, /edge\/(\d+(\.\d+)?)/i);
      }
      else if (browserName === 'seamonkey') {
        return getFirstMatch(ua, /seamonkey\/(\d+(\.\d+)?)/i);
      }
      else if (browserName === 'firefox') {
        return getFirstMatch(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i);
      }
      else if (browserName === 'silk') {
        return getFirstMatch(/silk\/(\d+(\.\d+)?)/i);
      }
      else if (browserName === 'phantom') {
        return getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i);
      }
      else if (browserName === 'sailfish') {
        return getFirstMatch(ua, /sailfish\s?browser\/(\d+(\.\d+)?)/i);
      }
      else if (osName === 'android') {
        return versionIdentifier;
      }
  }

  function detect(ua) {
    if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
      result = {
        name: 'Firefox'
      , firefox: t
      , version:
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (webos) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (tizen) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/safari/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      , version: versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      result.name = result.name || "Webkit"
      result.webkit = t
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.msedge && (android || result.silk)) {
      result.android = t
    } else if (iosdevice) {
      result[iosdevice] = t
      result.ios = t
    } else if (windows) {
      result.windows = t
    } else if (mac) {
      result.mac = t
    } else if (linux) {
      result.linux = t
    }

    // OS version extraction
    var osVersion = '';
    if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = osVersion.split('.')[0];
    if (tablet || iosdevice == 'ipad' || (android && (osMajorVersion == 3 || (osMajorVersion == 4 && !mobile))) || result.silk) {
      result.tablet = t
    } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || result.blackberry || result.webos || result.bada) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
        (result.chrome && result.version >= 20) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});
