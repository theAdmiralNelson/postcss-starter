`npm run postcss src/scss/main.scss --output output.css` works as expected (with a few caveats for .scss parsing)

The main issue with grabbing multiple files with postcss is this error:
`Input Error: Must use --dir or --replace with multiple input files`
--dir just puts them in a specified directory
--replace writes over the original file

These 2 flags don't allow for renaming the file with a `.css` extension

Glob for all .scss files that don't start with undersore
`"post": "NODE*ENV=development postcss \*\*/[!*]\*.scss --dir output",`

# Caveats

## Breakpoint mixins

`@else if` isn’t supported by postcss-scss, so all cases must be re-written to use only `@if`

```
@mixin bp($point) {

  @if $point ==narrow {
    @media #{$bp-narrow} {
      @content;
    }
  }

  @if $point ==mid {
    @media #{$bp-mid} {
      @content;
    }
  }

  @if $point ==wide {
    @media #{$bp-wide} {
      @content;
    }
  }

}


.test-1 {
  display: grid;
  flex-direction: row;
  align-items: center;

  @include bp(mid) {
    flex-direction: row;
  }

  span {
    margin-right: 5px;
  }
}
```

However, this breaks someplace, and this media query won't be found in the resulting css.

A better way to do it is using map-get like this:

````
$breakpoint: (
  'small': 36rem,
  'medium': 50rem,
  'large': 64rem
);


@mixin respond($bp) {
  @media (min-width: map-get($breakpoint, $bp)) {
    @content;
  }
}

.test-2 {
  width: 100%;

  @include respond('medium') {
    width: 40em;
  }
}```


## Rem calc function
This doesn't get parsed by postcss-scss, so another solution needs to be found
````
