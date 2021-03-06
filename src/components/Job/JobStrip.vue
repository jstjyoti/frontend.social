<template>
	<div class="job">
		<div class="role-and-expertise">
			<router-link :to="'../jobs/' + id">
				{{ role }}
			</router-link>
			<div class="job-strip-right-section">
				<div class="expertise capsule">
					{{ experienceLevel }}
				</div>
				<div v-if="isRemote" class="remote capsule">Remote</div>
				<div>
					<span
						v-if="canModify"
						class="event-action"
						@click.prevent="editJob(id)"
					>
						<img :src="`/images/edit.svg`" class="icon-button" alt="edit" />
					</span>
					<span
						v-if="canModify"
						class="event-action"
						@click.prevent="deleteJob(id)"
					>
						<img :src="`/images/delete.svg`" class="icon-button" alt="delete" />
					</span>
				</div>
			</div>
		</div>
		<div class="skills-required">
			<SkillTags v-if="requiredSkills" :skills="requiredSkills" />
		</div>
		<a class="btn-apply" :href="link" target="_blank">
			<Button label="Apply" />
		</a>
		<div ref="description" class="location-description">
			<span class="company">{{ company }}</span
			>|
			<a :href="'/city/' + city + '/' + country">
				<span class="city">{{ city }}, {{ country }}</span>
			</a>
		</div>
		<div
			ref="description"
			class="job-description"
			:class="{
				expanded: isExpanded,
				collapsed: isOverflow,
			}"
			v-html="jobDescription"
		/>
		<div v-if="showArrow" class="arrow-container">
			<Arrow :is-expanded="isExpanded" :on-click="toggleArrow" />
		</div>
	</div>
</template>

<script>
import Button from '../Buttons/Button';
import jobService from '@/services/job.service';
import Arrow from '../Arrow/Arrow';
import SkillTags from '@/components/Skills/SkillTags';

import UserService from '@/services/user.service';
const getExperienceLevel = (level) => {
	switch (level) {
		case 0:
			return 'Beginner';
		case 1:
			return 'Intermediate';
		case 2:
			return 'Expert';
		default:
			'Beginner';
	}
};
export default {
	name: 'JobStrip',
	components: {
		Button,
		Arrow,
		SkillTags,
	},
	props: {
		id: {
			type: String,
			default: '',
		},
		role: {
			type: String,
			default: '',
		},
		expertise: {
			type: Number,
			default: 0,
		},
		jobDescription: {
			type: String,
			default: 'Job Description',
		},
		requiredSkills: {
			type: Array,
			required: true,
		},
		link: {
			type: String,
			default: '#',
		},
		city: {
			type: String,
			default: 'City',
		},
		country: {
			type: String,
			default: 'Country',
		},
		company: {
			type: String,
			default: 'Company',
		},
		isRemote: {
			type: Boolean,
			default: false,
		},
		canModify: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			detailsLabel: 'Details',
			requiredSkillsLabel: 'Required Skills',
			experienceLevel: getExperienceLevel(this.expertise),
			isExpanded: false,
			isOverflow: false,
			showArrow: false,
			activity: {
				title: '',
				pageLink: '',
				model: 'j',
				activityType: 'd',
			},
		};
	},
	mounted() {
		var element = this.$refs.description;
		if (element) {
			this.isOverflow =
				element.offsetHeight < element.scrollHeight ||
				element.offsetWidth < element.scrollWidth;
			this.showArrow = this.isOverflow;
		}
	},
	methods: {
		toggleArrow() {
			this.isExpanded = !this.isExpanded;
			this.isOverflow = !this.isOverflow;
		},
		deleteJob(id) {
			(this.activity.title = this.role),
				(this.activity.pageLink = this.link),
				this.$emit('delete', id);
			UserService.addActivities(this.activity)
				.then((resp) => {})
				.catch((err) => {
					console.log(err);
				});
		},
		editJob(id) {
			this.$router.push('job/form/' + id);
		},
	},
};
</script>

<style scoped lang="scss">
.job {
	width: 90%;
	border-bottom: dotted 1px #114273;
	padding: 10px;
	position: relative;
}
.job .role-and-expertise {
	display: flex;
	justify-content: space-between;
	padding: 5px 0;
}
.expertise,
.remote {
	font-size: 0.65rem;
}
.remote {
	background: #c50606;
	color: white;
}
.job .skills-required {
	text-align: left;
	padding: 5px 0;
	font-size: 0.65rem;
}
.job-description {
	font-size: 0.8rem;
	text-align: start;
	max-height: 100px;
	overflow: hidden;
}
.location-description {
	font-size: 0.8rem;
	text-align: start;
	max-height: 100px;
	overflow: hidden;
}
.btn-apply {
	right: 0;
	position: absolute;
	z-index: 8;
	bottom: 10px;
}
.collapsed {
	-webkit-mask-image: -webkit-gradient(
		linear,
		left top,
		left bottom,
		from(rgba(0, 0, 0, 1)),
		to(rgba(0, 0, 0, 0))
	);
}

.expanded {
	max-height: unset;
}

.arrow-container {
	display: flex;
	justify-content: center;
	align-content: center;
}
.company {
	font-weight: bold;
}
.job-strip-right-section {
	display: flex;
	align-items: center;
}
@media screen and (max-width: 759px) {
	.job {
		width: 98%;
	}
}
</style>
