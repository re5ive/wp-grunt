<?php
/**
 ** The main template file.
 **
 ** This is the most generic template file in a WordPress theme
 ** and one of the two required files for a theme (the other being style.css).
 ** It is usedto display a pa ge when nothing more specific matches a query.
 ** E.g., it puts together the home page when no home.php file exists.
 ** Learn more: http://codex.wordpress.org/Template_Hierarchy
 **
 ** @package PTD FORREYGALLAND
 ** @since 1.0.0
 **/
get_header(); ?>
	
	<main class="container" role="main">
		<div>
			<section class="col-md-12">
				<?php if(have_posts()): ?>
					<?php while(have_posts()): the_post(); ?>
						<?php the_content(); ?>
					<?php endwhile; ?>
				<?php endif; ?>
			</section>
		</div>
	</main>
	
<?php get_footer(); ?>