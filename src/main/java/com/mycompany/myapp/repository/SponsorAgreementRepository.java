package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.SponsorAgreement;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the SponsorAgreement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SponsorAgreementRepository extends JpaRepository<SponsorAgreement, Long>, JpaSpecificationExecutor<SponsorAgreement> {

}
