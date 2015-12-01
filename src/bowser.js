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
    else if (/bada/i.test(ua)) {
      return 'bada';
    }
    if (/firefox/i.test(ua) && /\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
      return 'firefoxos';
    }
    // non-desktop linux like android, sailfish, tizen, etc. will have returned
    // by now. use 'linux' to represent desktop (or unrecognized) linuxes.
    else if (/linux/i.test(ua)) {
      return 'linux';
    }
  }

  function getOSVersion(ua, osName) {
    if (osName === 'windowsphone') {
      return getFirstMatch(ua, /windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (osName === 'ios') {
      return getFirstMatch(ua, /os (\d+([_\s]\d+)*) like mac os x/i)
        .replace(/[_\s]/g, '.');
    } else if (osName === 'android') {
      return getFirstMatch(ua, /android[ \/-](\d+(\.\d+)*)/i);
    } else if (osName === 'webos') {
      return getFirstMatch(ua, /(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (osName === 'blackberry') {
      return getFirstMatch(ua, /rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (osName === 'bada') {
      return getFirstMatch(ua, /bada\/(\d+(\.\d+)*)/i);
    } else if (osName === 'tizen') {
      return getFirstMatch(ua, /tizen[\/\s](\d+(\.\d+)*)/i);
    }
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
    else if (/(web|hpw)os/i.test(ua)) {
      return 'webos';
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
    else if (/dolfin/i.test(ua)) {
      return 'dolfin';
    }
    // the android stock browser. Chrome/Firefox for android contain 'android',
    // but will have returned above.
    else if (/android/i.test(ua)) {
      return 'android';
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      return 'blackberry';
    }

    return getFirstMatch(ua, /^(.*)\/(.*) /);
  }

  function getBrowserVersion(ua, browserName) {
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
        return getFirstMatch(ua, /(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i);
      }
      else if (browserName === 'silk') {
        return getFirstMatch(ua, /silk\/(\d+(\.\d+)?)/i);
      }
      else if (browserName === 'phantom') {
        return getFirstMatch(ua, /phantomjs\/(\d+(\.\d+)?)/i);
      }
      else if (browserName === 'sailfish') {
        return getFirstMatch(ua, /sailfish\s?browser\/(\d+(\.\d+)?)/i);
      }
      else if (browserName === 'android') {
        return versionIdentifier;
      }
      else if (browserName === 'safari') {
        return versionIdentifier;
      }
      else if (browserName === 'blackberry') {
        return versionIdentifier || getFirstMatch(ua, /blackberry[\d]+\/(\d+(\.\d+)?)/i);
      }
      else if (browserName === 'webos') {
        return versionIdentifier || getFirstMatch(ua, /w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i);
      }
      else if (browserName === 'dolfin') {
        return getFirstMatch(ua, /dolfin\/(\d+(\.\d+)?)/i);
      }
      else if (browserName === 'tizen') {
        return getFirstMatch(ua, /(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier;
      }

      return getSecondMatch(ua, /^(.*)\/(.*) /);
  }

  function detect(ua) {
    var browserName = getBrowserName(ua);
    var browserVersion = getBrowserVersion(ua, browserName);
    var osName = getOSName(ua);
    var osVersion = getOSVersion(ua, osName);

    console.log('b', browserName, 'bv', browserVersion, 'os', osName, 'osv', osVersion);
    // if (iosdevice) {
    //   result = {
    //     name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
    //   }
    //   // WTF: version is not part of user agent in web apps
    //   if (versionIdentifier) {
    //     result.version = versionIdentifier
    //   }
    // }

      // /touchpad\//i.test(ua) && (result.touchpad = t)
    return {
    }
   }

    // set webkit or gecko flag for browsers based on these engines
    // if (!result.msedge && /(apple)?webkit/i.test(ua)) {
    //   result.name = result.name || "Webkit"
    //   result.webkit = t
    //   if (!result.version && versionIdentifier) {
    //     result.version = versionIdentifier
    //   }
    // } else if (!result.opera && /gecko\//i.test(ua)) {
    //   result.name = result.name || "Gecko"
    //   result.gecko = t
    //   result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    // }

    // set OS flags for platforms that have multiple browsers
    // if (!result.msedge && (android || result.silk)) {
    //   result.android = t
    // } else if (iosdevice) {
    //   result[iosdevice] = t
    //   result.ios = t
    // } else if (windows) {
    //   result.windows = t
    // } else if (mac) {
    //   result.mac = t
    // } else if (linux) {
    //   result.linux = t
    // }

    // device type extraction
    // var osMajorVersion = osVersion.split('.')[0];
    // if (tablet || iosdevice == 'ipad' || (android && (osMajorVersion == 3 || (osMajorVersion == 4 && !mobile))) || result.silk) {
    //   result.tablet = t
    // } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || result.blackberry || result.webos || result.bada) {
    //   result.mobile = t
    // }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    // if (result.msedge ||
    //     (result.msie && result.version >= 10) ||
    //     (result.yandexbrowser && result.version >= 15) ||
    //     (result.chrome && result.version >= 20) ||
    //     (result.firefox && result.version >= 20.0) ||
    //     (result.safari && result.version >= 6) ||
    //     (result.opera && result.version >= 10.0) ||
    //     (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
    //     (result.blackberry && result.version >= 10.1)
    //     ) {
    //   result.a = t;
    // }
    // else if ((result.msie && result.version < 10) ||
    //     (result.chrome && result.version < 20) ||
    //     (result.firefox && result.version < 20.0) ||
    //     (result.safari && result.version < 6) ||
    //     (result.opera && result.version < 10.0) ||
    //     (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
    //     ) {
    //   result.c = t
    // } else result.x = t

    // return result
  // }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '');

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
