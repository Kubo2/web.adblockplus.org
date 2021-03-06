"use strict";

(function()
{
  function escapeRegExp(string)
  {
    return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

  function hasClass(element, className)
  {
    return !!element.className.match("\\b" + escapeRegExp(className) + "\\b");
  }

  function addClass(element, className)
  {
    if (hasClass(element, className))
      return;

    if (element.className.length)
      element.className += " ";
    element.className += className;
  }

  function removeClass(element, className)
  {
    var regExp = new RegExp("\\s*\\b" + escapeRegExp(className) + "\\b\\s*");
    element.className = element.className.replace(regExp, "");
  }

  function toggleClass(element, className)
  {
    if (hasClass(element, className))
      removeClass(element, className);
    else
      addClass(element, className);
  }

  function stopPropagation(event)
  {
    if (typeof window.event !== "undefined"
        && typeof window.event.cancelBubble !== "undefined")
      window.event.cancelBubble = true;
    else
      event.stopPropagation();
  }

  function initLanguageSelection()
  {
    var language = document.getElementById("language");
    var languageSelection = language.getElementsByTagName("ul")[0];

    document.documentElement.onclick = function()
    {
      removeClass(languageSelection, "visible");
    };

    language.onclick = function(event)
    {
      if (hasClass(languageSelection, "visible"))
        return;

      addClass(languageSelection, "visible");
      stopPropagation(event);
    };
  }

  function getSelectedItem(menu)
  {
    var items = menu.getElementsByTagName("li");
    for (var i = 0; i < items.length; i++)
    {
      var item = items[i];
      if (hasClass(item, "selected"))
        return item;
    }
  }

  function initMenu()
  {
    if ("querySelector" in document)
    {
      var menu = document.querySelector("header nav>ul");
      var selectedItem = getSelectedItem(menu);
      if (selectedItem)
        selectedItem.onclick = function()
        {
          toggleClass(menu, "visible");
        };
    }
  }

  function initFooterSection(section)
  {
    var header = section.getElementsByTagName("h1")[0];
    header.onclick = function()
    {
      toggleClass(section, "visible");
    };
  }

  function initFooter()
  {
    var footerContent = document.getElementById("footer-content");
    var footerNav = footerContent.getElementsByTagName("nav")[0];
    var footerNavSections = footerNav.getElementsByTagName("section");

    for (var i = 0; i < footerNavSections.length; i++)
    {
      var section = footerNavSections[i];
      initFooterSection(section);
    }
  }

  initLanguageSelection();
  initMenu();
  initFooter();
})();
