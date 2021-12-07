<script lang="ts">
  export let type = 'website'
  export let className = ''

  const iconList = {
    website: `/svg/website.svg`,
    unknown: `/svg/link.svg`,
    facebook: `/svg/facebook.svg`,
    twitter: `/svg/twitter.svg`,
  }

  let displayIcon = iconList['unknown']
  if (type in iconList) displayIcon = iconList[type]
</script>


<img class="w-3 h-3 {className} {$$props.class}" src={displayIcon} alt={type} />
