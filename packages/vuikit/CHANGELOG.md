# Changelog

## 0.8.10 (Sep 3, 2018)

 - Added `src` back as part of the npm package.

## 0.8.9 (Sep 2, 2018)

 - Reverted changes.
 - Fixed `vk-modal-close` events binding.

## 0.8.6 - 0.8.8

 - Failed attempt to fix IE icons display.

## 0.8.5 (May 29, 2018)

 - Fixed `vk-tooltip` unbind.
 - Fixed `vk-tooltip` display when title is empty.
 - Fixed `vk-modal` display on appear.
 - Fixed `vk-modal-full` close button trigger listener.
 - Fixed `vk-offcanvas` flipped display.
 - Fixed IE support.

## 0.8.4 (April 26, 2018)

 - Fixed regression from 0.8.3

## 0.8.3 (April 21, 2018)

 - Fixed Server Side Rendering.
 - Fixed `vk-navbar-full` transparent modifier.
 - Fixed and changed `v-position` constants export.
 - Fixed env issue affecting ES and CJS builds.
 - Enhanced `vk-pagination` responsivnes by applying `vk-margin` directive.
 - Enhanced `vk-modal-close`, close on click event is now programmatically attached.
 - Changed ElementNavbarLogo tag to `span`.
 - Added ElementNavbarNavigation and ElementNavbarLogoLink elements.

## 0.8.2 (March 23, 2018)

 - Fixed regression affecting `vk-navbar` dropdowns.

## 0.8.1 (March 23, 2018)

 - Components constants are now exported for easier integration with other components.
 - Refactored VkNavbar and fixed JS errors when combined with `vk-navbar-dropbar`.
 - Renamed `vk-pagination-page-*` prop `label` as `title`.
 - Exposed `vk-pagination` icons as elements.
 - Fixed `vk-icon-*` edge issue.
 - Fixed `vk-drop` touch events.

## 0.8.0 (April 15, 2018)

 - A complete refactor with UIkit 3 compatibility

## 0.6.0 (October 2, 2016)

 - Raised `vue` minimum version to 2.0
 - Refactored all components with breaking changes
 - Removed `vk-filter`

## 0.5.0 (August 9, 2016)

 - Added `vk-filter` component
 - Refactored `vk-table` with breaking changes
 - Refactored `vk-picker` with breaking changes
 - Refactored `vk-datepicker` with breaking changes
 - Refactored `vk-pagination` with breaking changes

## 0.4.1 (July 13, 2016)

 - Added missing dependency
 - Fixed build which was including Vue in dist bundle

## 0.4.0 (July 12, 2016)

 - Added `vk-table` component
 - Added `vk-picker` component
 - Added `vk-dropdown` component
 - Refactored `vk-calendar` with breaking changes
 - Refactored `vk-datepicker` with breaking changes

## 0.3.0 (June 30, 2016)

 - Initial public release
