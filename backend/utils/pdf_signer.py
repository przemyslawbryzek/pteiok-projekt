import os
from pyhanko.sign import signers
from pyhanko.pdf_utils.incremental_writer import IncrementalPdfFileWriter
from pyhanko.sign.fields import SigFieldSpec, append_signature_field

CERT_PATH = os.path.join(os.path.dirname(__file__), "../certs/public_cert.pem")
KEY_PATH = os.path.join(os.path.dirname(__file__), "../certs/private_key.pem")

def sign_pdf(input_pdf_path, output_pdf_path):
    with open(input_pdf_path, "rb") as inf:
        writer = IncrementalPdfFileWriter(inf)
        append_signature_field(writer, SigFieldSpec(sig_field_name="SellerSignature"))
        signer = signers.SimpleSigner.load(
            key_file=KEY_PATH,
            cert_file=CERT_PATH,
            key_passphrase=None,
        )

        pdf_signer = signers.PdfSigner(
            signers.PdfSignatureMetadata(field_name="SellerSignature"),
            signer=signer,
        )

        with open(output_pdf_path, "wb") as outf:
            pdf_signer.sign_pdf(writer, output=outf)

    return output_pdf_path
