// ==UserScript==
// @name         github unfollow all users on page
// @namespace    http://tampermonkey.net/
// @version      0.1
// @license      MIT License
// @description  Unfollows all users in current users profile
// @author       isyuricunha
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?domain=github.com
// ==/UserScript==

(function () {
  "use strict";

  if (document.querySelectorAll(".user-following-container").length == 0)
    return;

  function unfollow_all() {
    console.log("Started unfollowing...");
    const unfollowSwitchButton = document.getElementById("unfollow-all");
    unfollowSwitchButton.disabled = true;
    unfollowSwitchButton.onclick = () => {};
    unfollowSwitchButton.innerText = "Unfollow in progress...";

    setInterval(() => {
      const unfollowButton = document.querySelector('input[value="Unfollow"]');
      if (unfollowButton !== null) {
        console.log(unfollowButton.title);
        unfollowButton.click();
        unfollowButton.remove();
      } else {
        console.log("Unfollowing finished");
        location.reload();
      }
    }, 2000);
  }

  document
    .querySelector(".js-profile-editable-area .js-user-profile-bio")
    .insertAdjacentHTML(
      "afterEnd",
      '<div class="mb-3"><button name="button" type="button" class="btn btn-block" id="unfollow-all">Unfollow all user.</button></div>'
    );
  console.log("Added unfollow button");

  document.getElementById("unfollow-all").onclick = unfollow_all;
})();
