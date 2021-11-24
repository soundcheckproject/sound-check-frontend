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


<img class="w-4 h-4 {className}" src={displayIcon} alt={type} />
