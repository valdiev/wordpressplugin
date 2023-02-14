/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */

import { useBlockProps, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor'
import { Placeholder, Button } from '@wordpress/components'

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const blockProps = useBlockProps();


	const onChangeContent = content => {
		props.setAttributes( { content: content } )
	}
	const onSelectImage = picture => {

		console.log(picture) // Afficher les informations récupérées de l'image

		props.setAttributes( {
			pictureID: picture.id,
			pictureURL: picture.url,
			pictureAlt: picture.alt,
		})
	}

	// Effacement des données de l'image
	const onRemoveImage = () => {
		props.setAttributes({
			pictureID: null,
			pictureURL: null,
			pictureAlt: null,
		})
	}

	return (
		<div {...blockProps} className="containerBlock1">
			<div className="blockImageBlock1">
				{!props.attributes.pictureID ? (
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectImage}
							allowedTypes={["image"]}
							value={props.attributes.pictureID}
							render={({ open }) => (
								<Placeholder
									icon="images-alt"
									label={__("Image", "capitainewp-gut-bases")}
								>
									<Button isLarge onClick={open} icon="upload">
										{__("Importer une image", "capitainewp-gut-bases")}
									</Button>
								</Placeholder>
							)}
						/>
					</MediaUploadCheck>
				) : (
					<p className="image-wrapper">
						<img
							src={props.attributes.pictureURL}
							alt={props.attributes.pictureAlt}
						/>

						{props.isSelected && (
							<Button
								className="remove-image"
								onClick={onRemoveImage}
								icon="dismiss"
							>
								{__("Supprimer l'image", "capitainewp-gut-bases")}
							</Button>
						)}
					</p>
				)}
			</div>
			<div className="blockTexteBlock1">
				<RichText
					tagName="p"
					placeholder={__(
						"Légende",
						"capitainewp-gut-bases"
					)}
					value={props.attributes.content}
					className="content"
					onChange={onChangeContent}
				/>
			</div>
		</div>
	);
}
