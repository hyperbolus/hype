/**
 * @typedef {Object} Model
 * @property {Number} id
 * @property {Date} created_at
 * @property {Date} update_at
 */

/**
 * @typedef {Object} Forum
 * @extends Model
 * @property {String} name
 * @property {String} slug
 * @property {String} description
 * @property {?Number} threads_count
 * @property {?Number} posts_count
 */
