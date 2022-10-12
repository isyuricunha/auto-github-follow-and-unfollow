// ==UserScript==
// @name         github follow all users on page
// @namespace    http://tampermonkey.net/
// @version      0.1
// @license      MIT License
// @description  follows all users in current users profile
// @author       Leonid Fedotov
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?domain=github.com
// ==/UserScript==

(function() {
    'use strict';

    if (document.querySelectorAll('.user-following-container').length == 0) return;

    function follow_all() {

        console.log('Started following...')
        const unfollowSwitchButton = document.getElementById('unfollow-all')
        unfollowSwitchButton.disabled = true
        unfollowSwitchButton.onclick = () => {}
        unfollowSwitchButton.innerText = 'Following in progress...'

        setInterval(() => {
            const unfollowButton = document.querySelector('input[value="Follow"]')
            if (unfollowButton !== null) {
                console.log(unfollowButton.title)
                unfollowButton.click()
                unfollowButton.remove()
            } else {
                console.log('Unfollowing finished')
                location.reload()
            }
        }, 2000);
    }

    document.querySelector('.js-profile-editable-area .js-user-profile-bio').insertAdjacentHTML('afterEnd', '<div class="mb-3"><button name="button" type="button" class="btn btn-block" id="unfollow-all">Seguir todos os usuários na página atual.</button></div>')
    console.log('Added unfollow button')

    document.getElementById('unfollow-all').onclick = follow_all;
})();