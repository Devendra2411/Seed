v3.1.2
==================
* oops, reverting demo

v3.1.1
==================
* fix overflow for custom content use cases

v3.1.0
==================
* added the fill-container property and iron-fit-behavior to enable modals within containers

v3.0.1
==================
* Adds the `px-modal-dismissed` event which is fired when the user closes
  the modal by pressing the escape key
* Adds the `disableCloseOnEscape` property which keeps the modal open when
  the user presses the escape key

v3.0.0
==================
Upgrades `<px-modal>` element and its related styles to support Polymer 1 and 2.
Refactors to simplify API and make the modal easier to implement in apps.

There are many major breaking changes in this release, please see below for more
information and an upgrade guide:

## Breaking change: Create the modal open trigger somewhere else in your app

The trigger the user taps to open the modal should no longer be passed in to
the `<px-modal>` component as a child. Create a trigger element somewhere else
in your application and data-bind a reference to your trigger to the new
`openTrigger` property on `<px-modal>`.

This is an example of the old deprecated way to define a trigger:

```
<px-modal>
  <button class="modal-trigger">Show modal</button>
</px-modal>
```

To upgrade to the new way, the above code should be changed to:

```
<!-- Inside a Polymer template -->
<px-modal open-trigger="[[modalTrigger]]"></px-modal>
<px-modal-trigger trigger="{{modalTrigger}}">
  <!-- Mouse, touch, and keyboard events on this button show the modal -->
  <button>Show modal</button>
</px-modal-trigger>
```

You can also control the modal by updating the `opened` property. Setting it to
`true` opens the modal, and setting it to `false` closes the modal. Update the
`opened` property when the user performs an action that should show/hide the
modal if you want to control its visibility through properties alone.
For example:

```
<px-modal id="modal"></px-modal>
<button id="trigger">Show modal</button>
<script>
  var modal = document.getElementById('modal');
  var trigger = document.getElementById('trigger');
  trigger.addEventListener('click', (e) => {
    modal.opened = true;
  }, false);
</script>
```

See the px-modal documentation for more information on using the new modal APIs.

## Breaking change: Properties renamed and removed, methods removed

* The `modalHeading` property is renamed to `headerText`
* The `btnModalPositive` property is renamed to `acceptText`
* The `btnModalNegative` property is renamed to `rejectText`
* The `modalId` property is deprecated and removed
* The `modalIdTitle()` method is deprecated and removed
* The `modalActionButtonClicked()` method is deprecated and removed
* The `modalButtonClicked()` method is removed, just set the `opened` property
  to `true` or `false` to show/hide the modal
* The `btnModalPositiveClickedEventName` and `btnModalNegativeClickedEventName`
  Properties are deprecated and removed, see migration tips below

## Breaking change: Custom event renaming removed, use new events

The `btnModalPositiveClickedEventName` and `btnModalNegativeClickedEventName`
properties have been removed, and custom event names can no longer be chosen.
The modal now fires the `px-modal-accepted` event when the user taps the
accept trigger and the `px-modal-rejected` event when the user taps the reject
trigger. To migrate, change your event listeners to catch these new events
and decide how to handle the action in your application code. If you want
to continue firing custom named events, you can attach an event listener to
`<px-modal>` in your app and fire a custom event manually when one of the
standard events are fired.

## Breaking change: CSS mixins removed

CSS mixins are deprecated because the browser vendors have decided not to move
forward with that specification. Search in your code and remove the following
mixins if they are used:

```
--px-modal
--px-modal-content
--px-modal-title
--px-modal-buttons
--px-modal-positive-button
```

v2.0.8
==================
* add device flags

v2.0.7
==================
* fix #17, switch content to slot

v2.0.6
==================
* fix #21, prevent modal from reappearing

v2.0.5
==================
* temp fix for css @apply bug

v2.0.4
==================
* fix dependencies and recompile sass

v2.0.3
==================
* Fix comment for analyzer

v2.0.2
==================
* runtime theming for demo

v2.0.1
==================
* remove old icon reference in demo

v2.0.0
==================
* component redesign

v1.4.10
==================
* removed word-break as it was causing strange behavior

v1.4.9
==================
* updated demo to allow users to close modal on option 1

v1.4.8
==================
* updated demo per design feedback

v1.4.7
==================
* added button type to avoid problems in forms

v1.4.6
==================
* updated to px-demo

v1.4.4
==================
* Updating so px-demo-snippet and px-api-viewer get new grays

v1.4.3
==================
* Update colors design to pick up new colors

v1.4.2
==================
* changing ghp.sh to account for Alpha releases

v1.4.1
==================
* Added min-width at large screen size and fixed spacing

v1.4.0
==================
* Updated dependencies

v1.3.10
==================
* changing browser in wct testing from safari 8 to safari 10 on elcapitan

v1.3.9
==================
* changing all devDeps to ^

v1.3.8
==================
* Update px-theme to 2.0.1 and update test fixtures

v1.3.7
==================
* removing px-theme style call


v1.3.6
==================
* changing Gruntfile.js to gulpfile.js

v1.3.5
==================
* fixed style variable for rgba

v1.3.4
==================
* bower updating px-demo-snippet

v1.3.3
==================
* added style variables for theming

v1.3.2
==================
* Update dependencies

v1.3.1
==================
* fixed id bug

v1.3.0
==================
* Gulp upgrade

v1.2.11
==================
* added codepen

v1.2.10
==================
* changed responsive behavior
* added property for background scrolling disable
* added style mixins per issue 7

v1.2.9
==================
* updated 'open modal' button styles

v1.2.8
==================
* fixed demo bugs

v1.2.7
==================
* Added property for disabling positive modal button

v1.2.6
==================
* Enabled btn--disabled

v1.2.5
==================
* updated mega demo styles and bower px-demo-snippet to ^

v1.2.4
==================
* added image to readme, removed watch, added view on github

v1.2.3
==================
* added mega demo

v1.2.2
==================
* fixed vulcanize for old demo

v1.2.1
==================
* added vulcanize to demo gh-pages

v1.2.0
==================
* Upgrade to Polymer 1.5.0

v1.1.3
==================
* added oss_notice to bower ignore

v1.1.2
==================
* added pull request test for travis and updated OSS Notice

v1.1.1
==================
* added auto github pages functionality

v1.1.0
==================
* Upgrade to Polymer 1.4.0

v1.0.6
==================
* removed documentation from README and put link to gh-pages API

v1.0.5
==================
* Added white-space normal to modal to fix gh issue that it inherits.

v1.0.4
==================
* Style fixes for readme

v1.0.3
==================
* Added README

v1.0.2
==================
* Updated License

v0.0.1
==================
* Initial release
